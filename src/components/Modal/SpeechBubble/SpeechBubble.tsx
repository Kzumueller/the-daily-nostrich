import { type ReactNode, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import './SpeechBubble.css'

interface Props {
  children: ReactNode
  right?: boolean;
  left?: boolean;
}

const minMarginY = 16;
const minMarginX = 8;

/** A type of modal to confer information that wouldn't be printed in our simulated paper */
export const SpeechBubble = ({ children, left, right }: Props) => {
  useEffect(() => {
    if (left === right) console.warn('SpeechBubble ought to have either `left` or `right` set to true');
  }, [left, right])

  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    // dynamic margins work better with round containers
    const boundingClient = contentRef.current?.getBoundingClientRect();
    const marginX = (boundingClient?.width ?? 0) / 4;
    const marginY = (boundingClient?.height ?? 0) / 4;
    contentRef.current.style.margin = `${Math.max(minMarginY, marginY)}px ${Math.max(minMarginX, marginX)}px`;
  }, []);

  const classModifier = useMemo(() => left ? 'left' : right ? 'right' : '', [left, right])

  return <div className={`speechBubble speechBubble--${classModifier}`}>
    <div ref={contentRef} className="speechBubble__content">
      {children}
    </div>
    <div className={`speechBubble__arrowBit speechBubble__arrowBit--${classModifier}`}></div>
  </div>
}