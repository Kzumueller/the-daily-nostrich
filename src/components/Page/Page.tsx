import {useNotes} from "../../store/notes/useNotes.ts";
import "./Page.css";
import {Note} from "../Note/Note.tsx";

// const measureContent = (content: string) => content.length

export const Page = () => {
  const notes = useNotes().slice(0, 100);

  return <div className="page">
    {notes.map(note => <Note key={note.id} note={note} />)}
  </div>;
};