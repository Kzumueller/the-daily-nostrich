import { NDKUser } from "@nostr-dev-kit/ndk";

export type SimpleUser = Pick<NDKUser, "pubkey" | "profile">