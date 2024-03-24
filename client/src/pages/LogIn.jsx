import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import InputField from "../components/InputField";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  
  return (
    <PageContainer>
      <div className="w-2/3 p-4 max-w-[500px] flex flex-col gap-4 justify-center items-center bg-bg-secondary rounded shadow">
        <h3 className=" font-semibold text-xl text-blue-primary">Log In</h3>
        <form className=" w-full flex flex-col items-start gap-2">
          <InputField
            value={email}
            setValue={setEmail}
            type={"email"}
            label={"email: "}
          />
          <InputField
            value={passWord}
            setValue={setPassWord}
            type={"password"}
            label={"password: "}
          />
          <button className="py-2 px-6 shadow text-white font-semibold bg-blue-primary rounded">
            Sign Up
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default LogIn;
