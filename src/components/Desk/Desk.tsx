import useNostr from "../../store/nostr/useNostr.ts";
import {LoginModal} from "../LoginModal/LoginModal.tsx";
import "./Desk.css";
import {Paper} from "../Paper/Paper.tsx";
import {Newsboy} from "../Newsboy/Newsboy.tsx";

/* TODO: Not entirely happy with simply using localStorage but that's literally how Primal does it */
const nsec = localStorage.getItem("nsec");

/** Contains the entire app, also provides a vaguely mahogany-coloured background */
export const Desk = () => {
  const {connected, connect, connecting} = useNostr();

  if (nsec && !connected && !connecting)
    void connect(nsec);

  if (!connected && !connecting) {
    return <LoginModal/>;
  }

  return <div className="desk">
    <Newsboy/>
    <Paper/>
  </div>;
};