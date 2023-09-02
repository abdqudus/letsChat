import { WINDOW_ACTION_TYPES } from "./window-.action-types";
const INITIAL_STATE = {
  screenSize: window.innerWidth,
  isMobileDevice: window.innerWidth <= 600,
  showMobileMessages: false,
};
const WindowSizeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WINDOW_ACTION_TYPES.SET_SCREEN_SIZE:
      return {
        screenSize: action.payload,
        isMobileDevice: window.innerWidth <= 600,
      };
    case WINDOW_ACTION_TYPES.SHOW_SMALL_SCREEN_MESSAGE:
      return { ...state, showMobileMessages: !state.showMobileMessages };
    default:
      return state;
  }
};
export default WindowSizeReducer;
