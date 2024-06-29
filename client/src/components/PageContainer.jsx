import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className=" overflow-auto min-h-[calc(100vh-64px)] p-4 flex justify-center items-center">
      {children}
    </div>
  );
};

export default PageContainer;
