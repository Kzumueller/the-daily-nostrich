import type {SimpleNote} from "../../store/notes/notes.ts";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import "./Note.css";
import {fetchMentionedUsers, type MentionMap} from "./utility/fetchMentionedUsers.ts";
import {UserImage} from "../UserImage/UserImage.tsx";

interface Props {
  note: SimpleNote;
}

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, {dateStyle: "short", timeStyle: "short"});

/** Main content element, able to display images, videos, mentions, and URLs within a note's content */
export const Note = ({note}: Props) => {
  const [mentions, setMentions] = useState<MentionMap>({});
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMentionedUsers(note.content).then(setMentions).catch(console.error);
  }, [note.content]);

  /** parses images & videos, replaces npubs & nprofiles with user names */
  const {text, images, videos} = useMemo(() => {
    const imageMatches = note.content.match(/http[\wd.:/]*\.(?:jpg|jpeg|png|gif|webp)/);
    const videoMatches = note.content.match(/http[\wd.:/]*\.(?:mp4|mov)/);

    let text = note.content.replaceAll(/http.*\.(jpg|jpeg|png|gif|webp|mp4|mov)/g, "");

    Object.entries(mentions).forEach(([id, user]) => {
      text = text.replace(`nostr:${id}`, `@${user.profile?.name}`);
    });

    return {
      images: imageMatches ?? [],
      videos: videoMatches ?? [],
      text
    };
  }, [note, mentions]);

  /** replaces URLs with anchor tags in situ */
  useLayoutEffect(() => {
    const urlMatches = contentRef.current!.innerText.match(/http[\wd:/.?&=]*/) ?? [];

    urlMatches.forEach(match => {
      contentRef.current!.innerHTML = contentRef.current!.innerText
        .replace(match, `<a href=${match} target="_blank">${match}</a>`);
    });
  });

  const createdAt = useMemo(() => new Date((note.created_at ?? 0) * 1e3), [note.created_at]);

  return <div className="note">
    <div className="note__layout">
      {images.map(src => <img key={src} className="note__media" src={src} alt="image"/>)}
      {videos.map(src => <video controls muted key={src} className="note__media" src={src}/>)}
      <div ref={contentRef} className="note__content">{text}</div>
    </div>
    <div className="note__author">
      <UserImage user={note.author}/>
      <div className="note__authorName">{note.author.profile?.displayName}</div>
      <div className="note__timestamp">({dateFormatter.format(createdAt)})</div>
    </div>
  </div>;
};