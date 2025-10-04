import type NDK from "@nostr-dev-kit/ndk";
import type { NDKSubscription } from "@nostr-dev-kit/ndk";

interface Client {
  ndk : NDK;
  textNoteSubscription: NDKSubscription;
}

export const nostrClient: Client = {
  ndk: null as unknown as NDK,
  textNoteSubscription: null as unknown as NDKSubscription
}