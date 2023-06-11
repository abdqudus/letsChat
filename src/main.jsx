import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./Contexts/AuthContext.jsx";
import ChatContextProvider from "./Contexts/ChatContext.jsx";
import ShowChatContextProvider from "./Contexts/ShowChatContext.jsx";
import ShowEmojiContextProvider from "./Contexts/ShowEmojiContext.jsx";
import ShowMobileDeviceChat from "./Contexts/ShowMobileDeviceChat.jsx";
import SelectedImgContextProvider from "./Contexts/SelectedImgContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ShowChatContextProvider>
      <ChatContextProvider>
        <SelectedImgContextProvider>
          <ShowEmojiContextProvider>
            <ShowMobileDeviceChat>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </ShowMobileDeviceChat>
          </ShowEmojiContextProvider>
        </SelectedImgContextProvider>
      </ChatContextProvider>
    </ShowChatContextProvider>
  </AuthContextProvider>
);
