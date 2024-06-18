import React, { useContext, useState } from "react";
import PageContainer from "../components/PageContainer";
import InputField from "../components/InputField";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const SignUp = () => {
  const avatars = [avatar1, avatar2, avatar3];
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const { setUserData } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/auth/signup",
        data: {
          userName,
          email,
          passWord,
          avatar,
        },
        withCredentials: true,
      });
      setUserData({...res.data.data});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <div className=" w-2/3 p-4 max-w-[500px] flex flex-col gap-4 justify-center items-center bg-bg-secondary rounded shadow">
        <h3 className=" font-semibold text-xl text-blue-primary">Sign Up</h3>
        <form
          onSubmit={handleSignUp}
          className=" w-full flex flex-col items-start gap-2"
        >
          <InputField
            value={userName}
            setValue={setUserName}
            type={"text"}
            label={"user name: "}
          />
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

          <div className=" flex flex-col gap-2">
            <h3 className=" font-medium text-lg">select you avatar: </h3>
            <div className=" flex gap-2 items-center">
              {avatars.map((avt, idx) => (
                <div
                  key={idx}
                  className={`${
                    avatar == `avatar${idx + 1}`
                      ? " border-blue-primary"
                      : " border-white"
                  } p-1 border-2 border-solid rounded-full cursor-pointer`}
                >
                  <img
                    src={avt}
                    alt="avatar"
                    className=" w-12 h-12 rounded-full"
                    onClick={() => setAvatar(`avatar${idx + 1}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="py-2 px-6 shadow text-white font-semibold bg-blue-primary rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default SignUp;