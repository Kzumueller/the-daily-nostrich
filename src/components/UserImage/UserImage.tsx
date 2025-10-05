import fallbackImage from "../../assets/top-hat.png";
import { memo } from "react";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import type { SimpleUser } from "../../store/notes/SimpleUser.ts";

interface Props {
  user?: NDKUser | SimpleUser
}

/** Round image displaying users, defaults to a gentlemanly feller wearing a top hat */
export const UserImage = memo(({ user }: Props) =>
  <img className="userImage" src={user?.profile?.picture ?? fallbackImage} alt="I"/>
)