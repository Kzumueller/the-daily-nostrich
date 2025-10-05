import "./Newsboy.css";
import {useAllNotes} from "../../store/notes/useAllNotes.ts";
import {usePrintedNotes} from "../../store/notes/usePrintedNotes.ts";
import {useCallback, useMemo} from "react";
import {SpeechBubble} from "../Modal/SpeechBubble/SpeechBubble.tsx";
import {useDispatch} from "react-redux";
import {printLatest} from "../../store/notes/notes.ts";

/** Will always let you know about the latest news */
export const Newsboy = () => {
  const dispatch = useDispatch();
  const [latestNote] = useAllNotes();
  const [firstPrintedNote] = usePrintedNotes();

  const upToDate = useMemo(
    () => latestNote?.id === firstPrintedNote?.id,
    [firstPrintedNote?.id, latestNote?.id]
  );

  console.log({latestNote, firstPrintedNote});

  const update = useCallback(() => {
    dispatch(printLatest());

    setTimeout(() => window.scrollTo({top: 0, behavior: "smooth"}), 1500);
  }, [dispatch]);

  if (upToDate) return null;

  return <div className="newsBoy" onClick={update}>
    <SpeechBubble left>
      Extra! Extra!
      <br/>
      Read all about it!
    </SpeechBubble>
  </div>;
};
