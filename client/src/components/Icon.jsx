import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

import React from "react";

const Icon = ({ type, className }) => {
  switch (type) {
    case "addContact":
      return <IoPersonAdd className={className} />;
    case "removeContact":
      return <IoPersonRemove className={className} />;
    case "search":
      return <FaSearch className={className} />;
    case "people":
      return <IoPeople className={className} />;
    case "logOut":
      return <IoMdLogOut className={className} />;
    case "eye":
      return <FaEye className={className} />;
    case "closedEye":
      return <TbEyeClosed className={className} />;
    default:
      return null;
  }
};

export default Icon;
