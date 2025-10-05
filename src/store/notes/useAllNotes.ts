import {useSelector} from "react-redux";
import type {State} from "../store.ts";

export const useAllNotes = () => useSelector((state: State) => state.notes.allNotes)