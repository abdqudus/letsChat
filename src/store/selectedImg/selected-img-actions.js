import { createAction } from "../../utils/reducer/reducer.utils";
import { SELECTED_IMG_TYPES } from "./selected-img-types";

export const showSelectedImg = (boolean) =>
  createAction(SELECTED_IMG_TYPES.SHOW_SELECTED_IMG, boolean);
export const selectedImg = (img) =>
  createAction(SELECTED_IMG_TYPES.SELECTED_IMG, img);
