import {useMemo} from "react";
import useNostr from "../../store/nostr/useNostr.ts";
import "./EditorInChief.css";
import {UserImage} from "../UserImage/UserImage.tsx";

/** Image of the current user, future gateway to account settings */
export const EditorInChief = () => {
  const {ndk} = useNostr();
  const user = useMemo(() => ndk?.activeUser, [ndk?.activeUser]);

  return <div className="editorInChief">
    <UserImage user={user} />
  </div>;
};