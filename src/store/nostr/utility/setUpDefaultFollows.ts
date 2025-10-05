import type NDK from "@nostr-dev-kit/ndk";
import type { EventPointer } from "@nostr-dev-kit/ndk";

/**
 * "Welcome To Nostr. Jumpstart Your Nostr Feed: A Curated List"
 * https://following.space/d/odenjo2n582o?p=f901616f00a63f4f9c7881d4871a03df3d4cee7291eafd7adcbeea7c95c58e27
 */
const defaultFollowList = "nevent1qvzqqqr4xypzp7gpv9hspf3lf7w83qw5sudq8heafnh89y02l4ade0h20j2utr38qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmwdaehgu3wdau8gu3wv3jhvqgawaehxw309ahx7um5wgkhqatz9emk2mrvdaexgetj9ehx2aqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqpqxt437mv8hunpk5cpt0h8wszrlvrh3wtxhyae8672zepmnhr4ydfs6ne795";

/**
 * makes the current user follow every account on the list above so new users have something to read
 * @param ndk
 */
export const setUpDefaultFollows = async (ndk: NDK) => {
  const entity = ndk.getEntity(defaultFollowList) as { type: "nevent", data: EventPointer };
  const event = await ndk.fetchEvent(entity.data.id);
  const userIds = event?.getMatchingTags("p")?.map?.(tag => tag[1]) ?? [];

  await Promise.all(userIds.map(id => ndk.activeUser?.follow?.(ndk.getUser(id))));
};
