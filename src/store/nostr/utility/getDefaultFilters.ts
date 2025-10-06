import type { NDKFilter } from "@nostr-dev-kit/ndk";
import type NDK from "@nostr-dev-kit/ndk";
import {setUpDefaultFollows} from "./setUpDefaultFollows.ts";
import {getStartDate} from "./getStartDate.ts";
import {store} from "../../store.ts";
import {setFollowingAuthors} from "../../interactiveLog/interactiveLog.ts";

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

  store.dispatch(setFollowingAuthors(0))

  return {
    kinds: [1/*, 30023*/],
    authors: Array.from(follows ?? []),
    since: getStartDate(),
    limit: 200
  } as NDKFilter;
};
