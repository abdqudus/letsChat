import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { SELECTED_IMG_ACTION_TYPES } from "./selected-img-types";

type SelectedImageType = ActionWithPayload<
  SELECTED_IMG_ACTION_TYPES.SELECTED_IMG,
  string
>;
type ShowSelectedImgType = ActionWithPayload<
  SELECTED_IMG_ACTION_TYPES.SHOW_SELECTED_IMG,
  boolean
>;
export const showSelectedImg = withMatcher(
  (boolean: boolean): ShowSelectedImgType =>
    createAction(SELECTED_IMG_ACTION_TYPES.SHOW_SELECTED_IMG, boolean)
);
export const selectedImg = withMatcher(
  (img: string): SelectedImageType =>
    createAction(SELECTED_IMG_ACTION_TYPES.SELECTED_IMG, img)
);
