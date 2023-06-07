import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
const INITIAL_STATE = {
  chatId: "null",
  user: {},
};
const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "change_user":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ dispatch, data: state }}>
      {/* Here the context is sending dispatch and state to all its child component */}

      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
