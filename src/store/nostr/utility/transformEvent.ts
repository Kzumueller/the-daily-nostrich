import type {NDKEvent} from "@nostr-dev-kit/ndk";

import { fetchMentionedUsers } from "./fetchMentionedUsers.ts";
import type { RichNote } from "../../notes/RichNote.ts";

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, {dateStyle: "short", timeStyle: "short"});

/**
 * Maps events to serializable, redux-friendly representations and filters unwanted events
 * @param event
 */
export const transformEvent = async (event: NDKEvent): Promise<RichNote | null> => {
  // referenced/quoted events don't quite fit in with the newspaper aesthetic just yet
  if (event.hasTag("q") || event.hasTag("e")) return null;
  if (/(nostr:nevent|nostr:note)/.test(event.content)) return null;

  const {created_at, content, tags, kind, id, sig, pubkey, signatureVerified, author, relay} = event;

  await author.fetchProfile({}, true);
  const mentions = await fetchMentionedUsers(event);

  const images = event.content.match(/http[\wd.:/]*\.(?:jpg|jpeg|png|gif|webp)/) ?? [];
  const videos = event.content.match(/http[\wd.:/]*\.(?:mp4|mov)/) ?? [];
  let text = event.content.replaceAll(/http.*\.(jpg|jpeg|png|gif|webp|mp4|mov)/g, "");

  Object.entries(mentions).forEach(([id, user]) => {
    text = text.replaceAll(`nostr:${id}`, `@${user.profile?.name}`);
  });

  const createdAtHr = dateFormatter.format(new Date((created_at ?? 0) * 1e3))

  return {
    created_at,
    createdAtHr,
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
    relayUrl: relay?.url ?? '',
    author: {
      pubkey: author.pubkey,
      profile: author.profile
    }
  };
};