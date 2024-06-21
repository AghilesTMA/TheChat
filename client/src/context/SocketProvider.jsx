import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socketInfo = {
  socket: null,
  onlineUsers: [],
};

const SocketProvider = ({ children }) => {
  const [socketData, setSocketData] = useState(socketInfo);
  const { id, userName } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      const mySocket = io("http://localhost:3000", {
        query: {
          userId: id,
          userName,
        },
      });
      setSocketData((prev) => ({ ...prev, socket: mySocket }));
      mySocket.on("recieve-online-users",arr=>{
        setSocketData(prev=>({...prev,onlineUsers:arr}));
      });
      return () => mySocket.close();
    }
  }, [id]);
  return (
    <SocketContext.Provider value={{ ...socketData }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
export default SocketProvider;
