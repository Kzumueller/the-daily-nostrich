import type {RichNote} from "../../store/notes/RichNote.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {type NDKEvent, NDKKind} from "@nostr-dev-kit/ndk";
import {useNostr} from "../../store/nostr/useNostr.ts";
import {explicitRelayUrls} from "../../store/nostr/utility/explicitRelayUrls.ts";

/** collects reactions to the given note, also resolves whether the active user has already reacted and offers refetching */
export const useReactions = (note: RichNote) => {
  const {ndk} = useNostr()
  const [reactions, setReactions] = useState<NDKEvent[]>([]);

  /** fetches reactions to the given note */
  const fetchReactions = useCallback(async () => {
    if (!ndk || !note) return;

    const reactions = await ndk.fetchEvents({
      kinds: [NDKKind.Reaction],
      "#e": [note.id],
      "#k": [note.kind.toString()],
      since: note.created_at,
    }, {
      closeOnEose: true,
      skipValidation: true,
      skipVerification: true,
      relayUrls: explicitRelayUrls
    });

    setReactions([...reactions]);
  }, [note, ndk]);

  useEffect(() => {
    void fetchReactions();
  }, [fetchReactions]);

  /** whether the current user has already reacted */
  const hasReacted = useMemo(
    () => reactions.some(event => event.getMatchingTags('p').some(tag => tag[1] === ndk?.activeUser?.pubkey)),
    [ndk?.activeUser?.pubkey, reactions]
  )

  return useMemo(() => ({
    hasReacted,
    reactions,
    fetchReactions
  }), [hasReacted, reactions, fetchReactions]);
};