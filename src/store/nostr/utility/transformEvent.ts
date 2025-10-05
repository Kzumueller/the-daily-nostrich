import type {NDKEvent} from "@nostr-dev-kit/ndk";

import { fetchMentionedUsers } from "./fetchMentionedUsers.ts";
import type { RichNote } from "../../notes/RichNote.ts";

/**
 * Maps events to serializable, redux-friendly representations and filters unwanted events
 * @param event
 */
export const transformEvent = async (event: NDKEvent): Promise<RichNote | null> => {
  // referenced/quoted events don't quite fit in with the newspaper aesthetic just yet
  if (event.hasTag("q") || event.hasTag("e")) return null;
  if (/(nostr:nevent|nostr:note)/.test(event.content)) return null;

  const {created_at, content, tags, kind, id, sig, pubkey, signatureVerified, author} = event;

  await author.fetchProfile({}, true);
  const mentions = await fetchMentionedUsers(event);

  const images = event.content.match(/http[\wd.:/]*\.(?:jpg|jpeg|png|gif|webp)/) ?? [];
  const videos = event.content.match(/http[\wd.:/]*\.(?:mp4|mov)/) ?? [];
  let text = event.content.replaceAll(/http.*\.(jpg|jpeg|png|gif|webp|mp4|mov)/g, "");

  Object.entries(mentions).forEach(([id, user]) => {
    if (event.content.includes("nostr:nprofile1qqsd7dva9jdz5ckq"))
      console.log(`replacing nostr:${id} with @${user.profile?.name}`)
    text = text.replaceAll(`nostr:${id}`, `@${user.profile?.name}`);
  });

  if (event.content.includes("nostr:nprofile1qqsd7dva9jdz5ckq"))
    console.log('after', {text})

  return {
    created_at,
    content,
    tags,
    kind,
    id,
    sig,
    pubkey,
    signatureVerified,
    images,
    videos,
    text,
    mentions,
    author: {
      pubkey: author.pubkey,
      profile: author.profile
    }
  };
};