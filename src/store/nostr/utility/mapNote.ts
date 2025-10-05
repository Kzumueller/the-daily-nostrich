import type {NDKEvent} from "@nostr-dev-kit/ndk";
import {type SimpleNote} from "../../notes/notes.ts";

/**
 * Maps events to serializable, redux-friendly representations and filters unwanted notes
 * @param event
 */
export const mapNote = async (event: NDKEvent): Promise<SimpleNote | null> => {
  // events don't fit quite in with the newspaper aesthetic
  if (event.hasTag("q") || event.hasTag("e")) return null;
  if (/(nostr:nevent|nostr:note)/.test(event.content)) return null;

  const {created_at, content, tags, kind, id, sig, pubkey, signatureVerified, author} = event;

  await author.fetchProfile({}, true);

  return {
    created_at,
    content,
    tags,
    kind,
    id,
    sig,
    pubkey,
    signatureVerified,
    author: {
      pubkey: author.pubkey,
      profile: author.profile
    }
  };
};