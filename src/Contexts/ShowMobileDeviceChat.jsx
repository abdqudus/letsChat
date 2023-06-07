import React, { useEffect, useState } from "react";
import { createContext } from "react";
export const mobileDeviceChatContext = createContext();
const ShowMobileDeviceChat = ({ children }) => {
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  });
  return (
    <mobileDeviceChatContext.Provider
      value={{ showMobileChat, setShowMobileChat, width }}
    >
      {children}
    </mobileDeviceChatContext.Provider>
  );
};

export default ShowMobileDeviceChat;
