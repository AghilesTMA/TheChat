import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChatContext } from "./ChatProvider";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    avatar: "",
  });
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const verifyLogIn = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "api/auth/verifylogin",
          withCredentials: true,
        });

        const listRes = await axios({
          method: "get",
          url: "api/users/myList",
          withCredentials: true,
        });

        const userData = {
          id: res.data.data.id,
          userName: res.data.data.userName,
          avatar: res.data.data.avatar,
        };
        setUserData({ ...userData });
        dispatch({ type: "SET_MY_LIST", payload: listRes.data });
      } catch (error) {
        console.log(error);
      }
    };
    verifyLogIn();
  }, []);

  return (
    <AuthContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
