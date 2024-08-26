import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout min-h-[100vh] subpixel-antialiased">
      <Outlet />
    </div>
  );
};

export default Layout;
