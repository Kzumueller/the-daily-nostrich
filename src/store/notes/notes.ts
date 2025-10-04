import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {NDKKind, type NDKTag, NDKUser} from "@nostr-dev-kit/ndk";

export interface SimpleNote {
  created_at?: number;
  content: string;
  tags: NDKTag[];
  kind: NDKKind;
  id: string;
  sig?: string;
  pubkey: string;
  signatureVerified?: boolean;
  author: NDKUser
}

export interface NotesState {
  notes: SimpleNote[]
}

const initialState: NotesState = {
  notes: []
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<SimpleNote[]>) => {
      state.notes = action.payload;
    },
    addNotes: (state, action: PayloadAction<SimpleNote[]>) => {
      state.notes = [
        ...action.payload,
        ...state.notes
      ]
    },
  },
})

export const { setNotes, addNotes } = notesSlice.actions
export default notesSlice.reducer