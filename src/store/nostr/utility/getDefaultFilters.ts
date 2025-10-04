import type NDK from "@nostr-dev-kit/ndk";

export const getDefaultFilters = async (ndk: NDK) => {
  const follows = await ndk.activeUser?.followSet();

  const now = new Date();
  now.setDate(now.getDate() - 1);
  now.setHours(0, 0, 0, 0);
  const since = now.getTime() / 1e3;

  return {kinds: [1, 20], authors: Array.from(follows ?? []), since};
};
