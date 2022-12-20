import React, { useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import balanceIcon from "@Assets/balance.png";

const NavBar = () => {
  const Links = [
    { name: "Página Principal", path: "/principal", id: 1 },
    { name: "Subir Fallo", path: "/cargafallo", id: 2 },
    { name: "Fallos", path: "/fallos", id: 3 },
    { name: "Buscador", path: "/buscador", id: 4 },
    { name: "Ingresar", path: "/logIn", id: 5 },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 ">
      <div className="flex items-center justify-between bg-slate-800 py-4 md:px-10 px-7">
        <Link
          to="/"
          className="flex items-center gap-x-2.5 divide-x divide-x-white"
        >
          <img src={balanceIcon} className="h-6" />
          <p className="pl-2 text-white">OBSERVATORIO</p>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl right-8 top-6 cursor-pointer md:hidden text-white"
        >
          {!open ? <MdMenu /> : <MdMenuOpen />}
        </div>

        <ul
          className={`text-white md:flex md:items-center md:pb-0  md:static  md:z-auto md:w-auto md:pl-0 left-0 w-full pl-9 bg-slate-800 absolute transition-all duration-500 ease-in ${
            open ? "top-14 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.id} className="md:ml-8 text-xl md:my-0 my-7">
              {/* <Link to={link.path}>{link.name}</Link> */}
              <Link>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
