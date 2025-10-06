import {useSelector} from "react-redux";
import type {State} from "../store.ts";
import {useMemo} from "react";
import {nostrClient} from "./client.ts";
import {login} from "./utility/login.ts";
import {like} from "./utility/like.ts";

/** provides reactive status flags for nostr connection and hook-based access to nostr things */
export const useNostr = () => {
  const {connected, connecting} = useSelector((state: State) => state.nostr);

  return useMemo(() => ({
    ndk: nostrClient.ndk,
    textNoteSubscription: nostrClient.textNoteSubscription,
    connect: login,
    like,
    connecting,
    connected
  }), [connecting, connected]);
};