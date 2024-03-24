import React from "react";

const InputField = ({ label, type, value, setValue }) => {
  return (
    <div className=" w-full">
      <h4 className=" font-medium text-lg">{label}</h4>
      <input
        className=" w-full p-2 rounded border-gray-600 border-2 border-solid"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
