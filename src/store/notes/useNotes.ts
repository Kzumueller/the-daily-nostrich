import { useSelector } from "react-redux"
import type {State} from "../store.ts";

export const useNotes = () => {
  const notes = useSelector((state: State) => state.notes.notes)

  return notes ?? []
}
