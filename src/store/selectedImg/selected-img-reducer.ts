import { AnyAction } from "@reduxjs/toolkit";
import { selectedImg, showSelectedImg } from "./selected-img-actions";

const INITIAL_STATE: SelectedImgType = {
  showSelectedImg: false,
  img: null,
};
type SelectedImgType = {
  showSelectedImg: boolean;
  img: null | string;
};
export const selectedImgReducer = (
  state = INITIAL_STATE,
  action: AnyAction
) => {
  const { payload } = action;

  if (showSelectedImg.match(action)) {
    return { ...state, showSelectedImg: payload };
  }
  if (selectedImg.match(action)) {
    return { ...state, img: payload };
  }
  return state;
};
