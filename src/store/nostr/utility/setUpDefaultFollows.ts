import NDK, {NDKEvent} from "@nostr-dev-kit/ndk";
import {NDKKind} from "@nostr-dev-kit/ndk";
import {store} from "../../store.ts";
import {setFollowingAuthors} from "../../interactiveLog/interactiveLog.ts";

/**
 * makes the current user follow every account of the "Welcome To Nostr" follow pack
 * https://following.space/d/odenjo2n582o?p=f901616f00a63f4f9c7881d4871a03df3d4cee7291eafd7adcbeea7c95c58e27
 * @param ndk
 */
export const setUpDefaultFollows = async (ndk: NDK) => {
  const followPackEvents = Array.from(await ndk.fetchEvents({
    kinds: [NDKKind.FollowPack],
    limit: 100
  }));

  if (followPackEvents.length === 0) return;

  const followPackEvent = followPackEvents
    .find(event =>
      event
        .getMatchingTags("title")
        .some((tag) =>
          tag[1].includes("Welcome To Nostr")
        )
    ) ?? followPackEvents[0]; // default to the first pack if the welcome pack wasn't found

  const userTags = followPackEvent?.getMatchingTags("p");

  store.dispatch(setFollowingAuthors(userTags.length))

  const followListEvent = new NDKEvent(ndk, {
    kind: NDKKind.Contacts,
    tags: userTags
  })

  await followListEvent.sign();
  await followListEvent.publish();
};
