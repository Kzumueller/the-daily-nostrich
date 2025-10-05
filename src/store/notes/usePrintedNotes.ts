import {useSelector} from "react-redux";
import type {State} from "../store.ts";

export const usePrintedNotes = () => useSelector((state: State) => state.notes.printedNotes)
