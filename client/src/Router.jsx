import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthProvider";

const Router = () => {
  const { id, userName } = useContext(AuthContext);

  return (
    <div className=" bg-bg-primary h-screen">
      <Header userName={userName} />
      <Routes>
        <Route path="/" element={id ? <Home /> : <LogIn />} />
        <Route path="/login" element={!id ? <LogIn /> : <Home />} />
        <Route path="/signup" element={!id ? <SignUp /> : <Home />} />
        <Route path="/profile/:id" element={`Profile`} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
};

export default Router;
