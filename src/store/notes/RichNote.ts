import {NDKKind, type NDKTag} from "@nostr-dev-kit/ndk";
import type {MentionMap} from "../nostr/utility/fetchMentionedUsers.ts";
import type {SimpleUser} from "./SimpleUser.ts";

/**
 * (Kind 1) event enriched with images, videos, and mentions for easy rendering
 */
export interface RichNote {
  created_at?: number;
  createdAtHr?: string; // human-readable localized format
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
  relayUrl: string;
}