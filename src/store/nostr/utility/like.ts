import NDK, {NDKEvent, NDKKind} from "@nostr-dev-kit/ndk";
import type {RichNote} from "../../notes/RichNote.ts";
import {store} from "../../store.ts";
import {setInterjection} from "../../interactiveLog/interactiveLog.ts";

/**
 * Emits an ok_hand emoji, liking the given note
 * The OK gesture 👌 has been around since the early 19th century and would've been well-known at the time
 * our simulation is set
 */
export const like = async (ndk: NDK, note: RichNote) => {
  const approvalEvent = new NDKEvent(ndk, {
    kind: NDKKind.Reaction,
    content: "👌",
    tags: [
      ['e', note.id, note.relayUrl],
      ['p', ndk.activeUser?.pubkey ?? ""],
      ['k', note.kind.toString()]
    ]
  });

  store.dispatch(setInterjection({content: "Huzzah!", timeout: 2500}))

  await approvalEvent.sign();
  await approvalEvent.publish();
}