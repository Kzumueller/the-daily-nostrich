import {useInteractiveLog} from "../../store/interactiveLog/useInteractiveLog.ts";
import {SpeechBubble} from "../Modal/SpeechBubble/SpeechBubble.tsx";
import {ModalContainer} from "../Modal/ModalContainer.tsx";
import {usePrintedNotes} from "../../store/notes/usePrintedNotes.ts";

export const LoadingAnimation = () => {
  const notes = usePrintedNotes();
  const {setupTakingLonger, followingAuthors} = useInteractiveLog();

  // LoadingAnimation ought to be triggered
  if (notes.length > 0) return null;

  return <ModalContainer>
    <SpeechBubble left>
      This will take but a moment.
    </SpeechBubble>
    {setupTakingLonger && followingAuthors === 0 && <SpeechBubble left>
        My apologies, the press must be operating slowly today.
    </SpeechBubble>}
    {followingAuthors > 0 && <SpeechBubble left>
        We're employing {followingAuthors} writers for your reading pleasure.
    </SpeechBubble>}
  </ModalContainer>;
};