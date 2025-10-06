import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getDefaultFilters } from "./getDefaultFilters.ts";
import { addNotes, printLatest, setNotes } from "../../notes/notes.ts";
import { transformEvent } from "./transformEvent.ts";
import { nostrClient } from "../client.ts";
import { setConnected, setConnecting } from "../nostr.ts";
import { store } from "../../store.ts";
import {setSetupTakingLonger} from "../../interactiveLog/interactiveLog.ts";
import {explicitRelayUrls} from "./explicitRelayUrls.ts";

/**
 * connects via nsec, fetches today's notes by follows, and subscribes using the same filters
 */
export const login = async (nsec: string) => {
  store.dispatch(setConnecting(true));

  try {
    // shows a little message if the setup takes longer
    const setupTimeout = setTimeout(
      () => store.dispatch(setSetupTakingLonger(true)),
      5_000
    )

    const signer = new NDKPrivateKeySigner(nsec);

    const ndk = new NDK({
      explicitRelayUrls,
      signer
    });

    ndk.cacheAdapter?.clear?.()

    await ndk.connect();

    /* TODO: Not entirely happy with simply using localStorage but that's literally how Primal does it */
    localStorage.setItem("nsec", nsec);

    const filters = await getDefaultFilters(ndk);

    const initialEvents = Array.from(await ndk.fetchEvents(filters));
    const initialNotes = await Promise.all(initialEvents.map(transformEvent))

    store.dispatch(setNotes(initialNotes));
    store.dispatch(printLatest());

    clearTimeout(setupTimeout)

    const textNoteSubscription = ndk.subscribe(
      filters,
      {closeOnEose: false},
      {
        onEvent: async event => {
          await transformEvent(event)
          store.dispatch(addNotes([]));
        }
      }
    );

    await ndk.activeUser?.fetchProfile({}, true);

    nostrClient.ndk = ndk;
    nostrClient.textNoteSubscription = textNoteSubscription;
    store.dispatch(setConnected(true));
  } catch (error) {
    console.error(error);
  }

  store.dispatch(setConnecting(false));
}