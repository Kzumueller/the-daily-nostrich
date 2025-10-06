import {usePrintedNotes} from "../../store/notes/usePrintedNotes.ts";
import "./Page.css";
import {Note} from "../Note/Note.tsx";

/** Central container for displaying notes */
export const Page = () => {
  const notes = usePrintedNotes();

  if (notes.length === 0) return null;

  return <div className="page">
    {notes.map(note => <Note key={note.id} note={note} />)}
  </div>;
};