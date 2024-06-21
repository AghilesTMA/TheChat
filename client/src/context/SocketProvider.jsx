import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { id, userName } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      const mySocket = io("http://localhost:3000", {
        query: {
          userId: id,
          userName,
        },
      });
      setSocket(mySocket);
      return () => mySocket.close();
    }
  }, [id]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
export default SocketProvider;
