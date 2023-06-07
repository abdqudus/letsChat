import React, { createContext, useReducer } from "react";
export const showEmojiContext = createContext();
export default function ShowEmojiContextProvider({ children }) {
  const showEmojiReducer = (state, action) => {
    switch (action.type) {
      case "show emoji":
        return action.payload;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(showEmojiReducer, false);
  return (
    <showEmojiContext.Provider value={{ state, dispatch }}>
      {children}
    </showEmojiContext.Provider>
  );
}
