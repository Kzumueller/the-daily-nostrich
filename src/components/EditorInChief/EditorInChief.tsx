import {useMemo} from "react";
import {nostrClient} from "../../store/nostr/client.ts";

export const EditorInChief = () => {
  const user = useMemo(() => nostrClient.ndk.activeUser, []);

  return <div className="editorInChief">
    <img src={user?.profile?.picture} alt="Image" />
  </div>
}