import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

import React from 'react'

const Icon = ({type,className}) => {
  switch(type){
    case "addContact":
      return <IoPersonAdd className={className} />
    case "removeContact":
      return <IoPersonRemove className={className} />
    case "search":
      return <FaSearch className={className} />
    case "people":
      return <IoPeople className={className} />
    default:
      return null
  }
}

export default Icon