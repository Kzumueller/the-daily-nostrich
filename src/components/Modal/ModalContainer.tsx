import type {ReactNode} from "react";
import './ModalContainer.css'

interface Props {
  children: ReactNode
}

/** Overlay to contain speech bubbles */
export const ModalContainer = ({ children }: Props) => {
  return <div className="modalContainer">{children}</div>
}
