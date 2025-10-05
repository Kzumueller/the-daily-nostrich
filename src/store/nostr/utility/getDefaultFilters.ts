import type { NDKFilter } from "@nostr-dev-kit/ndk";
import type NDK from "@nostr-dev-kit/ndk";
import {setUpDefaultFollows} from "./setUpDefaultFollows.ts";

/**
 * returns filters to fetch and subscribe to events
 * Being a daily paper, those filters match all of yesterday's and today's notes by followed authors
 * Will subscribe and active user without any follows to a default list
 * @param ndk
 */
export const getDefaultFilters = async (ndk: NDK) => {
  let follows = await ndk.activeUser?.followSet?.();

  if(follows?.size === 0) {
    await setUpDefaultFollows(ndk)
    follows = await ndk.activeUser?.followSet();
  }

  const now = new Date();
  now.setDate(now.getDate() - 1);
  now.setHours(0, 0, 0, 0);
  const since = now.getTime() / 1e3;

  return {
    kinds: [1/*, 30023*/],
    authors: Array.from(follows ?? []),
    since
  } as NDKFilter;
};
