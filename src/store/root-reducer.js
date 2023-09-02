import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import WindowSizeReducer from "./window-size/window-reducer";
import { contactsReducer } from "./contacts/contact-reducer";
import { selectedImgReducer } from "./selectedImg/selected-img-reducer";
import { emojiReducer } from "./emoji/emoji-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  screenSize: WindowSizeReducer,
  contact: contactsReducer,
  selectedImg: selectedImgReducer,
  emoji: emojiReducer,
});
