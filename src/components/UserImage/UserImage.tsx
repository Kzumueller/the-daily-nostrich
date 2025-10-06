import fallbackImage from "../../assets/top-hat.png";
import {memo} from "react";
import type {NDKUser} from "@nostr-dev-kit/ndk";
import type {SimpleUser} from "../../store/notes/SimpleUser.ts";

interface Props {
  user?: NDKUser | SimpleUser;
  onClick?: () => void;
}

/** Round image displaying users, defaults to a gentlemanly feller wearing a top hat */
export const UserImage = memo(({user, onClick}: Props) => {
  const cursor = onClick ? "pointer" : "default";

  return <img className="userImage" style={{cursor}} src={user?.profile?.picture ?? fallbackImage} alt="I" onClick={onClick}/>;
  }
);