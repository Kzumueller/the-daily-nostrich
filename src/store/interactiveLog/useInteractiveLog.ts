import {useSelector} from "react-redux";
import type {State} from "../store.ts";

export const useInteractiveLog = () =>
  useSelector((state: State) => state.interactiveLog)