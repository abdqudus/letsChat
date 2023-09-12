import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { WINDOW_ACTION_TYPES } from "./window-.action-types";

type ScreenSize = ActionWithPayload<
  WINDOW_ACTION_TYPES.SET_SCREEN_SIZE,
  number
>;
export const setScreenSize = withMatcher(
  (size: number): ScreenSize =>
    createAction(WINDOW_ACTION_TYPES.SET_SCREEN_SIZE, size)
);

type WindowResize = Action<WINDOW_ACTION_TYPES.RESIZE_WINDOW_START>;
export const windowResize = withMatcher(
  (): WindowResize => createAction(WINDOW_ACTION_TYPES.RESIZE_WINDOW_START)
);

type ShowSmallScreenMessage =
  Action<WINDOW_ACTION_TYPES.SHOW_SMALL_SCREEN_MESSAGE>;

export const showSmallScreenMessage = withMatcher(
  (): ShowSmallScreenMessage =>
    createAction(WINDOW_ACTION_TYPES.SHOW_SMALL_SCREEN_MESSAGE)
);
