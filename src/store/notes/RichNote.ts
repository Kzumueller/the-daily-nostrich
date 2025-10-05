import { NDKKind, type NDKTag } from "@nostr-dev-kit/ndk";
import type { MentionMap } from "../nostr/utility/fetchMentionedUsers.ts";
import type { SimpleUser } from "./SimpleUser.ts";

export interface RichNote {
  created_at?: number;
  content: string;
  tags: NDKTag[];
  kind: NDKKind;
  id: string;
  sig?: string;
  pubkey: string;
  signatureVerified?: boolean;
  author: SimpleUser;
  mentions: MentionMap;
  images: string[];
  videos: string[];
  text: string;
}