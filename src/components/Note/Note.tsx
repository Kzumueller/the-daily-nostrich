import { useLayoutEffect, useMemo, useRef } from "react";
import { UserImage } from "../UserImage/UserImage.tsx";
import "./Note.css";
import type { RichNote } from "../../store/notes/RichNote.ts";

interface Props {
  note: RichNote;
}

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, {dateStyle: "short", timeStyle: "short"});

/** Main content element, able to display images, videos, mentions, and URLs within a note's content */
export const Note = ({note}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  /** replaces URLs with anchor tags in situ */
  useLayoutEffect(() => {
    const urlMatches = contentRef.current!.innerText.match(/http[\wd:/.?&=-]*/) ?? [];

    urlMatches.forEach(match => {
      contentRef.current!.innerHTML = contentRef.current!.innerText
        .replace(match, `<a href=${match} target="_blank">${match}</a>`);
    });
  });

  const createdAt = useMemo(() => new Date((note.created_at ?? 0) * 1e3), [note.created_at]);

  if(note.id === "4660b6f4fb1fea488e690dbfe5087e69e782a6a580fc3bb50b349af50662e390")
    console.log({ note })

  return <div className="note">
    <div className="note__layout">
      {note.images.map(src => <img key={src} className="note__media" src={src} alt="image"/>)}
      {note.videos.map(src => <video controls muted key={src} className="note__media" src={src}/>)}
      <div ref={contentRef} className="note__content">{note.text}</div>
    </div>
    <div className="note__author">
      <UserImage user={note.author}/>
      <div className="note__authorName">{note.author.profile?.displayName}</div>
      <div className="note__timestamp">({dateFormatter.format(createdAt)})</div>
    </div>
  </div>;
};