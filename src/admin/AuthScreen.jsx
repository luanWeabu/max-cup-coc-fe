import * as React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./global/TopBar";
import Sidebar from "./global/SideBar";

function AuthScreen() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div style={{ marginLeft: "200px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthScreen;
