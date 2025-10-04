import useNostr from "../../store/nostr/useNostr.ts";
import {LoginModal} from "../LoginModal/LoginModal.tsx";
import './Desk.css'
import {Paper} from "../Paper/Paper.tsx";

const nsec = localStorage.getItem('nsec')

export const Desk = () => {
  const { connected, connect, connecting } = useNostr()

  if (nsec && !connected && !connecting)
    void connect(nsec)

  if (!connected && !connecting) {
    return <LoginModal />
  }

  return <div className="desk">
    <Paper />
  </div>
}