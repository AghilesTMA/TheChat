import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    avatar: "",
  });
  return (
    <AuthContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
