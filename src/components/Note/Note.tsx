import {useCallback, useLayoutEffect, useRef} from "react";
import {UserImage} from "../UserImage/UserImage.tsx";
import "./Note.css";
import type {RichNote} from "../../store/notes/RichNote.ts";
import {useNostr} from "../../store/nostr/useNostr.ts";
import {useReactions} from "./useReactions.ts";

interface Props {
  note: RichNote;
}

/** Main content element, able to display images, videos, mentions, and URLs within a note's content */
export const Note = ({note}: Props) => {
  const {ndk, like} = useNostr();
  const contentRef = useRef<HTMLDivElement>(null);

  const { reactions, fetchReactions, hasReacted } = useReactions(note)

  /** replaces URLs with anchor tags in situ */
  useLayoutEffect(() => {
    const urlMatches = contentRef.current!.innerText.match(/http[\wd:/.?&=-]*/) ?? [];

    urlMatches.forEach(match => {
      contentRef.current!.innerHTML = contentRef.current!.innerText
        .replace(match, `<a href=${match} target="_blank">${match}</a>`);
    });
  });

  /** Approves of the note */
  const approve = useCallback(async () => {
    await like(ndk, note);
    await fetchReactions();
  }, [fetchReactions, like, ndk, note]);

  return <div className="note">
    <div className="note__layout">
      {note.images.map(src => <img key={src} className="note__media" src={src} alt="image"/>)}
      {note.videos.map(src => <video controls muted key={src} className="note__media" src={src}/>)}
      <div ref={contentRef} className="note__content">{note.text}</div>
    </div>
    <div className="note__metaRow">
      <UserImage user={note.author}/>
      <div className="note__metaText">
        <div className="note__metaRow">
          <div className="note__authorName">{note.author.profile?.displayName}</div>
          <div className="note__timestamp">({note.createdAtHr})</div>
        </div>
        <div className="note__actions">
          {hasReacted && <div>Approved ({reactions.length})</div>}
          {!hasReacted && <div className="note__like" onClick={approve}>Approve ({reactions.length})</div>}
        </div>
      </div>
    </div>
  </div>;
};