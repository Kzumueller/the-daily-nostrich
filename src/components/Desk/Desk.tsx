import {useNostr} from "../../store/nostr/useNostr.ts";
import {LoginModal} from "../LoginModal/LoginModal.tsx";
import "./Desk.css";
import {Paper} from "../Paper/Paper.tsx";
import {Newsboy} from "../Newsboy/Newsboy.tsx";
import {useEffect} from "react";
import {LoadingAnimation} from "../LoadingAnimation/LoadingAnimation.tsx";

/** Contains the entire app, also provides a vaguely mahogany-coloured background */
export const Desk = () => {
  const {connected, connect, connecting} = useNostr();

  useEffect(() => {
    /* TODO: Not entirely happy with simply using localStorage but that's literally how Primal does it */
    const nsec = localStorage.getItem("nsec");

    if (nsec && !connected && !connecting)
      void connect(nsec);
  }, [connect, connected, connecting]);

  if (!connected && !connecting) {
    return <LoginModal/>;
  }

  return <div className="desk">
    <LoadingAnimation/>
    <Newsboy/>
    <Paper/>
  </div>;
};