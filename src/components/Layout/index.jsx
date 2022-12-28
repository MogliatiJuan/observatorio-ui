import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
