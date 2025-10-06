import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface InteractiveLogState {
  setupTakingLonger: boolean;
  followingAuthors: number;
  interjection: {
    timeout: number;
    content: string;
  } | null
}

const initialState: InteractiveLogState = {
  setupTakingLonger: false,
  followingAuthors: 0,
  interjection: null
};

export const interactiveLogSlice = createSlice({
  name: "nostr",
  initialState,
  reducers: {
    setSetupTakingLonger: (state, action: PayloadAction<boolean>) => {
      state.setupTakingLonger = action.payload
    },
    setFollowingAuthors: (state, action: PayloadAction<number>) => {
      state.followingAuthors = action.payload;
    },
    setInterjection: (state, action: PayloadAction<InteractiveLogState["interjection"]>) => {
      state.interjection = action.payload
    }
  }
});

export const {setSetupTakingLonger, setFollowingAuthors, setInterjection} = interactiveLogSlice.actions;
export default interactiveLogSlice.reducer;