import {usePrintedNotes} from "../../store/notes/usePrintedNotes.ts";
import "./Page.css";
import {Note} from "../Note/Note.tsx";
import {SpeechBubble} from "../Modal/SpeechBubble/SpeechBubble.tsx";
import {ModalContainer} from "../Modal/ModalContainer.tsx";

/** Central container for displaying notes */
export const Page = () => {
  const notes = usePrintedNotes();

  if (notes.length === 0) {
    return <ModalContainer>
      <SpeechBubble left>
        This will take but a moment.
      </SpeechBubble>
    </ModalContainer>
  }

  return <div className="page">
    {notes.map(note => <Note key={note.id} note={note} />)}
  </div>;
};