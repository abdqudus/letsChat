import { SELECTED_IMG_TYPES } from "./selected-img-types";

const INITIAL_STATE = {
  showSelectedImg: false,
  img: null,
};

export const selectedImgReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_IMG_TYPES.SHOW_SELECTED_IMG:
      return { ...state, showSelectedImg: payload };
    case SELECTED_IMG_TYPES.SELECTED_IMG:
      return { ...state, img: payload };
    default:
      return state;
  }
};
