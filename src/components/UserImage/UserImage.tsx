import fallbackImage from "../../assets/top-hat.png";
import {memo} from "react";
import type {NDKUser} from "@nostr-dev-kit/ndk";
import type {SimpleUser} from "../../store/notes/notes.ts";

interface Props {
  user?: NDKUser | SimpleUser
}

export const UserImage = memo(({ user }: Props) =>
  <img className="userImage" src={user?.profile?.picture ?? fallbackImage} alt="I"/>
)