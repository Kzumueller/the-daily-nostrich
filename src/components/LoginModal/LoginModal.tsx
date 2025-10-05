import {ModalContainer} from "../Modal/ModalContainer.tsx";
import {SpeechBubble} from "../Modal/SpeechBubble/SpeechBubble.tsx";
import useNostr from "../../store/nostr/useNostr.ts";
import {useCallback, useState} from "react";
import {NDKPrivateKeySigner} from "@nostr-dev-kit/ndk";

/** Strikes up a conversation using speech bubbles for the user to enter or create an nsec */
export const LoginModal = () => {
  const {connect, connecting} = useNostr();
  const [nsec, setNsec] = useState("");

  const generate = useCallback(() => {
    setNsec(NDKPrivateKeySigner.generate().nsec);
  }, []);

  return <ModalContainer>
    <SpeechBubble left>
        Whose acquaintance do I
        <br />
        have the pleasure of making?
    </SpeechBubble>

    <SpeechBubble right>
      <textarea
        rows={4}
        style={{resize: "none", minWidth: 150}}
        placeholder="(Now, to remember my nsec...)"
        value={nsec}
        onChange={({target}) => setNsec(target.value)}
      />

      <button disabled={!nsec || connecting} onClick={() => connect(nsec)}>How do you do?</button>
      <button disabled={connecting} onClick={generate}>(Assume new identity)</button>
    </SpeechBubble>
  </ModalContainer>;
};