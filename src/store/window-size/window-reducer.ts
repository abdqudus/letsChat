import { AnyAction } from "@reduxjs/toolkit";
import { setScreenSize, showSmallScreenMessage } from "./window.action";

type WindowSizeState = {
  screenSize: number;
  isMobileDevice: boolean;
  showMobileMessages: boolean;
};

const INITIAL_STATE: WindowSizeState = {
  screenSize: window.innerWidth,
  isMobileDevice: window.innerWidth <= 600,
  showMobileMessages: false,
};

const WindowSizeReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (setScreenSize.match(action)) {
    return {
      screenSize: action.payload,
      isMobileDevice: window.innerWidth <= 600,
    };
  }
  if (showSmallScreenMessage.match(action)) {
    return { ...state, showMobileMessages: !state.showMobileMessages };
  }
  return state;
};
export default WindowSizeReducer;
