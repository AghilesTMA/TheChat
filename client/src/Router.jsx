import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={"Home"}/>
      <Route path="/login" element={"Log In"}/>
      <Route path="/signup" element={"Sign Up"}/>
      <Route path="/profile/:id" element={`Profile`}/>
      <Route path="*" element={<Navigate to={"/"} />}/>
    </Routes>
  );
};

export default Router;
