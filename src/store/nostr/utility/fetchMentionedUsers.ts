import type { SimpleUser } from "../../notes/SimpleUser.ts";
import type { NDKEvent } from "@nostr-dev-kit/ndk";

export type MentionMap = Record<string, SimpleUser>;

/**
 * fetches users mentioned in the given's event's content
 * @param event
 */
export const fetchMentionedUsers = async (event: NDKEvent) => {
  const ids = event.content.match(/(?:npub|nprofile)\w+/) ?? [];
  const mentions: MentionMap = {};

  for (const id of ids) {
    try {
      const isNpub = id.startsWith("npub");
      const user = event.ndk!.getUser(isNpub ? id : { nprofile: id });
      await user.fetchProfile({}, true);

      mentions[id] = { pubkey: user.pubkey, profile: user.profile };
    } catch (error) {
      console.error(error);
    }
  }

  return mentions;
};
