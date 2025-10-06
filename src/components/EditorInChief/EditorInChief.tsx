import {useCallback, useEffect, useMemo, useState} from "react";
import {useNostr} from "../../store/nostr/useNostr.ts";
import "./EditorInChief.css";
import {UserImage} from "../UserImage/UserImage.tsx";
import {SpeechBubble} from "../Modal/SpeechBubble/SpeechBubble.tsx";
import {useDispatch} from "react-redux";
import {setConnected} from "../../store/nostr/nostr.ts";
import {printLatest, setNotes} from "../../store/notes/notes.ts";
import {useInteractiveLog} from "../../store/interactiveLog/useInteractiveLog.ts";
import {setInterjection} from "../../store/interactiveLog/interactiveLog.ts";

/** Image of the current user, future gateway to account settings */
export const EditorInChief = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const {interjection} = useInteractiveLog();
  const {ndk, textNoteSubscription} = useNostr();
  const user = useMemo(() => ndk?.activeUser, [ndk?.activeUser]);

  /** clears state so the login modal is triggered again */
  const logOut = useCallback(() => {
    localStorage.removeItem("nsec");
    textNoteSubscription.stop();
    dispatch(setConnected(false));
    dispatch(setNotes([]));
    dispatch(printLatest());
    setMenuOpen(false);
  }, [dispatch, textNoteSubscription]);

  /** clears the current interjection after the specified timeout */
  useEffect(() => {
    if (!interjection?.content) return;
    setMenuOpen(false);

    const clearInterjection = () => dispatch(setInterjection(null));

    const timeout = setTimeout(
      clearInterjection,
      interjection.timeout
    );

    return () => {
      clearInterjection();
      clearTimeout(timeout);
    };
  }, [dispatch, interjection]);

  return <div className="editorInChief">
    <UserImage user={user} onClick={() => setMenuOpen(!menuOpen)}/>
    {menuOpen && <div className="editorInChief__bubbleContainer">
        <SpeechBubble right>
            <div>Quite finished?</div>
            <button onClick={logOut}>Retire</button>
        </SpeechBubble>
    </div>}

    {interjection?.content && <div className="editorInChief__bubbleContainer">
        <SpeechBubble right>
            <div>{interjection.content}</div>
        </SpeechBubble>
    </div>}
  </div>;
};