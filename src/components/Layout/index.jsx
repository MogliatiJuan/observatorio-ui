import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
