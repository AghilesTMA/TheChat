import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import ChatProvider from "./context/ChatProvider.jsx";
import SocketProvider from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </ChatProvider>
);
