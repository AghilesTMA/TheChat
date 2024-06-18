import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Header = ({ userName }) => {
  const { setUserData } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await axios({
        method: "get",
        url: "http://localhost:3000/auth/logout",
        withCredentials: true,
      });
      const emptyData = {
        id: "",
        userName: "",
        avatar: "",
      };
      setUserData({ ...emptyData });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex p-2 items-center justify-between gap-2 bg-bg-secondary shadow">
      <Link to={"/"}>
        <h1 className=" font-bold text-2xl text-blue-primary">TheChat</h1>
      </Link>
      <div className=" flex items-center gap-2">
        {userName && (
          <>
            <h3 className=" font-semibold text-xl">Hello {userName}!</h3>
            <span onClick={handleLogOut} className=" cursor-pointer">
              Log Out
            </span>
          </>
        )}

        {!userName ? (
          <div className=" flex gap-2 items-center font-medium text-lg">
            <Link to={"/login"}>
              <button className=" p-2 text-blue-primary">Log In</button>
            </Link>
            <Link to={"/signup"}>
              <button className=" p-2 border-2 border-solid border-blue-primary rounded ">
                Sign Up
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
