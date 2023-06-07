import React, { createContext, useReducer } from "react";
export const selectedImgContext = createContext();
export default function SelectedImgContextProvider({ children }) {
  const showSelectedImgReducer = (state, action) => {
    switch (action.type) {
      case "show selected image":
        return action.payload;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(showSelectedImgReducer, false);
  console.log(state);
  return (
    <selectedImgContext.Provider value={{ state, dispatch }}>
      {children}
    </selectedImgContext.Provider>
  );
}
