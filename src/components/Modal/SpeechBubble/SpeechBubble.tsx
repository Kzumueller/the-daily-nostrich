import {type ReactNode, useLayoutEffect, useMemo, useRef} from "react";
import './SpeechBubble.css'

interface Props {
  children: ReactNode
  right?: boolean;
  left?: boolean;
}

export const SpeechBubble = ({ children, left, right }: Props) => {
  if (left === right) console.warn('SpeechBubble ought to have either `left` or `right` set to true');

  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (contentRef.current)
      // dynamic margins work better with round containers
      contentRef.current.style.margin = `${(contentRef.current?.getBoundingClientRect()?.width ?? 0) / 5}px`
  }, []);

  const classModifier = useMemo(() => left ? 'left' : right ? 'right' : '', [left, right])

  return <div className={`speechBubble speechBubble--${classModifier}`}>
    <div ref={contentRef} className="speechBubble__content">
      {children}
    </div>
    <div className={`speechBubble__arrowBit speechBubble__arrowBit--${classModifier}`}></div>
  </div>
}