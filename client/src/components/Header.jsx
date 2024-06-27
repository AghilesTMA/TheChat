import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Icon from "./Icon";
import Avatar from "../components/Avatar";
import { ChatContext } from "../context/ChatProvider";

const Header = ({ userName }) => {
  const { setUserData, avatar } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleLogOut = async () => {
    try {
      await axios({
        method: "get",
        url: "api/auth/logout",
        withCredentials: true,
      });
      const emptyData = {
        id: "",
        userName: "",
        avatar: "",
      };
      setUserData({ ...emptyData });
      dispatch({ type: "RESET", payload: {} });
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
            <h3 className=" font-semibold text-lg">Hello {userName}!</h3>
            <button onClick={handleLogOut}>
              <Icon
                type={"logOut"}
                className={" text-2xl cursor-pointer hover:text-blue-active"}
              />
            </button>
            <div className=" w-8 h-8 rounded-full cursor-pointer">
              <Avatar avatar={avatar} className={"w-full rounded-full"} />
            </div>
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
