import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex p-2 items-center justify-between gap-2 bg-bg-secondary shadow">
      <Link to={"/"}>
        <h1 className=" font-bold text-2xl text-blue-primary">TheChat</h1>
      </Link>
      <div className=" flex items-center gap-2">
        <h3 className=" font-semibold text-xl">Hello User!</h3>
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
      </div>
    </div>
  );
};

export default Header;
