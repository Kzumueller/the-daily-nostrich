import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {NDKKind, type NDKTag, NDKUser} from "@nostr-dev-kit/ndk";

export type SimpleUser = Pick<NDKUser, "pubkey" | "profile">

export interface SimpleNote {
  created_at?: number;
  content: string;
  tags: NDKTag[];
  kind: NDKKind;
  id: string;
  sig?: string;
  pubkey: string;
  signatureVerified?: boolean;
  author: SimpleUser;
}

export interface NotesState {
  allNotes: SimpleNote[];
  printedNotes: SimpleNote[];
}

export type NoteInput = (SimpleNote | null)[]

const initialState: NotesState = {
  allNotes: [],
  printedNotes: []
};

const filterNotes = (notes: NoteInput) => notes.filter(note => !!note)

const sortNotes = (left: SimpleNote, right: SimpleNote) => (left?.created_at ?? 0) < (right?.created_at ?? 0) ? 1 : -1

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NoteInput>) => {
      state.allNotes = Array.from(new Set(filterNotes(action.payload))).sort(sortNotes);
    },
    addNotes: (state, action: PayloadAction<NoteInput>) => {
      console.log("addedNotes", action.payload);
      state.allNotes = Array.from(new Set([
        ...filterNotes(action.payload),
        ...state.allNotes
      ])).sort(sortNotes);
    },
    printLatest: (state) => {
      state.printedNotes = state.allNotes;
    }
  }
});

export const {setNotes, addNotes, printLatest} = notesSlice.actions;
export default notesSlice.reducer;