import { createAction } from "../../utils/reducer/reducer.utils";
import { WINDOW_ACTION_TYPES } from "./window-.action-types";

export const windowSizeActionCreator = (size) =>
  createAction(WINDOW_ACTION_TYPES.SET_SCREEN_SIZE, size);
export const windowResize = () =>
  createAction(WINDOW_ACTION_TYPES.RESIZE_WINDOW_START);
export const showSmallScreenMessage = () =>
  createAction(WINDOW_ACTION_TYPES.SHOW_SMALL_SCREEN_MESSAGE);
