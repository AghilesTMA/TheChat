import React from "react";
import Icon from "../components/Icon";


const PassWordEye = ({closed}) => {
  return (
    <>
      {closed ? (
        <Icon
          className={
            " absolute top-[50%] right-2 z-10 text-2xl cursor-pointer hover:text-blue-active "
          }
          type={"closedEye"}
        />
      ) : (
        <Icon
          className={
            " absolute top-[50%] right-2 z-10 text-2xl cursor-pointer hover:text-blue-active "
          }
          type={"eye"}
        />
      )}
    </>
  );
};

export default PassWordEye;
