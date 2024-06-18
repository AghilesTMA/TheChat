import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    avatar: "",
  });

  useEffect(()=>{
    const verifyLogIn = async ()=>{
      try {
        const res = await axios({
          method:"get",
          url:"http://localhost:3000/auth/verifylogin",
          withCredentials:true
        });

        const userData = {
          id:res.data.data.id,
          userName:res.data.data.userName,
          avatar:res.data.data.userName
        }
        setUserData({...userData});

      } catch (error) {
        console.log(error);
      }
    }
    verifyLogIn();
  },[]);

  return (
    <AuthContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
