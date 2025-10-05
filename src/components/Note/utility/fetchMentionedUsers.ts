import type {SimpleUser} from "../../../store/notes/notes.ts";
import {nostrClient} from "../../../store/nostr/client.ts";

export type MentionMap = Record<string, SimpleUser>;

/**
 * fetches users mentioned in the given's note's content
 * @param noteContent
 */
export const fetchMentionedUsers = async (noteContent: string) => {
  if (!nostrClient.ndk) return {};

  const npubs = noteContent.match(/npub\w+/) ?? [];
  const nprofiles = noteContent.match(/nprofile\w+/) ?? [];
  const ids = [...npubs, ...nprofiles];

  if (!ids.length) return {};

  const mentions: MentionMap = {};

  for (const id of ids) {
    const isNpub = id.startsWith("npub");
    const user = nostrClient.ndk.getUser(isNpub ? id : {nprofile: id});
    await user.fetchProfile({}, true);

    mentions[id] = {pubkey: user.pubkey, profile: user.profile};
  }

  for (const nprofile of nprofiles) {
    const user = nostrClient.ndk.getUser({nprofile});
    await user.fetchProfile({}, true);
    mentions[nprofile] = {pubkey: user.pubkey, profile: user.profile};
  }

  return mentions;
};
