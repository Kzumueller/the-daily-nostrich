import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import uniqby from "lodash.uniqby"
import type { RichNote } from "./RichNote.ts";

export interface NotesState {
  allNotes: RichNote[];
  printedNotes: RichNote[];
}

export type NoteInput = (RichNote | null)[]

const initialState: NotesState = {
  allNotes: [],
  printedNotes: []
};

/** removes nulls and deduplicates the given list by id */
const filterNotes = (notes: NoteInput) => uniqby(notes.filter(note => !!note), 'id')

/** sorts by created_at desc */
const sortNotes = (left: RichNote, right: RichNote) => (left?.created_at ?? 0) < (right?.created_at ?? 0) ? 1 : -1

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    /** sets allNotes, filtered, deduplicated, and sorted */
    setNotes: (state, action: PayloadAction<NoteInput>) => {
      state.allNotes = filterNotes(action.payload).sort(sortNotes);
      console.log('set Notes', filterNotes(action.payload).sort(sortNotes))
    },
    /** Adds the given payload to allNotes, filters and sorts */
    addNotes: (state, action: PayloadAction<NoteInput>) => {
      state.allNotes = filterNotes([
        ...action.payload,
        ...state.allNotes
      ]).sort(sortNotes);
    },
    /** moves allNotes to printedNotes, causing the list to update */
    printLatest: (state) => {
      state.printedNotes = state.allNotes;
    }
  }
});

export const {setNotes, addNotes, printLatest} = notesSlice.actions;
export default notesSlice.reducer;