import React from "react";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";

const Avatar = ({ avatar, className }) => {
  switch (avatar) {
    case "avatar1":
      return <img src={Avatar1} alt="avatar" className={className} />;
    case "avatar2":
      return <img src={Avatar2} alt="avatar" className={className} />;
    case "avatar3":
      return <img src={Avatar3} alt="avatar" className={className} />;
    default:
      return null;
  }
};

export default Avatar;
