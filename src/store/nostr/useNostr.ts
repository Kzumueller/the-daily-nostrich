import {useDispatch, useSelector} from "react-redux";
import type {State} from "../store.ts";
import {useCallback, useMemo} from "react";
import NDK, {NDKPrivateKeySigner} from "@nostr-dev-kit/ndk";
import {addNotes, setNotes} from "../notes/notes.ts";
import {setConnected, setConnecting} from "./nostr.ts";
import {nostrClient} from "./client.ts";
import {getDefaultFilters} from "./utility/getDefaultFilters.ts";
import {mapNote} from "./utility/mapNote.ts";

/** manages relay connection & subscriptions, provides `connect` method to provide a private key */
const useNostr = () => {
  const dispatch = useDispatch();
  const {connected, connecting} = useSelector((state: State) => state.nostr);

  /**
   * connects via nsec, fetches today's notes by follows, and subscribes using the same filters
   */
  const connect = useCallback(async (nsec: string) => {
    dispatch(setConnecting(true));

    try {
      const signer = new NDKPrivateKeySigner(nsec);

      const ndk = new NDK({
        explicitRelayUrls: ["wss://relay.primal.net"],
        signer
      });
      await ndk.connect();

      localStorage.setItem("nsec", nsec);

      const filters = await getDefaultFilters(ndk)
      const initialNotes = Array.from(await ndk.fetchEvents(filters));
      dispatch(setNotes(await Promise.all(initialNotes.map(mapNote))));

      const textNoteSubscription = ndk.subscribe(
        filters,
        {closeOnEose: false},
        {
          onEvent: async event => dispatch(addNotes([await mapNote(event)])),
          onEose: () => console.log("Text note stream has run dry")
        }
      );

      nostrClient.ndk = ndk;
      nostrClient.textNoteSubscription = textNoteSubscription;
      dispatch(setConnected(true));
    } catch (error) {
      console.error(error);
    }

    dispatch(setConnecting(false));
  }, [dispatch]);

  return useMemo(() => ({
    ndk: nostrClient.ndk,
    textNoteSubscription: nostrClient.textNoteSubscription,
    connect,
    connecting,
    connected
  }), [connect, connecting, connected]);
};
export default useNostr;