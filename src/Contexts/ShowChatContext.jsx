import React, { createContext, useReducer } from "react";
export const showChatContext = createContext();
export default function ShowChatContextProvider({ children }) {
  const showChatReducer = (state, action) => {
    switch (action.type) {
      case "show chat":
        return action.payload;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(showChatReducer, false);
  return (
    <showChatContext.Provider value={{ state, dispatch }}>
      {/* The state is used in the ChatInterface component */}
      {/* It is used to remove the 'click user to start chat page' */}
      {/* It does that by setting the state to false, thereby showing the message instead of the 'click user' prompt */}
      {children}
    </showChatContext.Provider>
  );
}
