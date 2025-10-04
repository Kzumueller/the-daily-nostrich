import type {NDKEvent} from "@nostr-dev-kit/ndk";
import {type SimpleNote} from "../../notes/notes.ts";

export const mapNote = async ({created_at, content, tags, kind, id, sig, pubkey, signatureVerified, author}: NDKEvent): Promise<SimpleNote> => {
  await author.fetchProfile({}, true);
  return {created_at, content, tags, kind, id, sig, pubkey, signatureVerified, author};
}