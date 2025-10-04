import "./Note.css";
import type {SimpleNote} from "../../store/notes/notes.ts";
import {useMemo} from "react";

interface Props {
  note: SimpleNote;
}

export const Note = ({note}: Props) => {
  const { text, images, videos } = useMemo(() => {
    const imageMatches = note.content.match(/http[\wd.:/]*\.(?:jpg|png)/);
    const videoMatches = note.content.match(/http[\wd.:/]*\.(?:mp4|mov)/);

    return {
      images: imageMatches ?? [],
      videos: videoMatches ?? [],
      text: note.content.replaceAll(/http.*\.(jpg|png|mp4|mov)/g, "")
    };
  }, [note]);

  if(videos.length)
    console.log({videos, content: note.content});

  return <div className="note">
    {images.map(src => <img key={src} className="note__media" src={src} alt="image" />)}
    {videos.map(src => <video controls muted key={src} className="note__media" src={src} />)}
    {text}
    <div className="note__author">
      <img className="note__authorPicture" src={note.author.profile?.picture} alt=""/>
      <div className="note__authorName">{note.author.profile?.displayName}</div>
    </div>
  </div>;
};