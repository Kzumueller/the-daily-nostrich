import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import NDK, {NDKSubscription} from "@nostr-dev-kit/ndk";

export interface NostrState {
  connected: boolean
  connecting: boolean
  ndk: NDK,
  textNoteSubscription: NDKSubscription
}

const initialState: NostrState = {
  connected: false,
  connecting: false,
  ndk: null as unknown as NDK,
  textNoteSubscription: null as unknown as NDKSubscription
};

export const nostrSlice = createSlice({
  name: "nostr",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.connecting = action.payload;
    }
  }
});

export const {setConnected, setConnecting} = nostrSlice.actions;
export default nostrSlice.reducer;