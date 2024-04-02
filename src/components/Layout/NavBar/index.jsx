import React, { useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import icon from "@Assets/icon.png";

const NavBar = () => {
  const Links = [
    { name: "Página Principal", path: "/principal", id: 1 },
    { name: "Subir Fallo", path: "/cargafallo", id: 2 },
    { name: "Buscador", path: "/buscador", id: 3 },
    { name: "Iniciar sesión", path: "/inicio-sesion", id: 4 },
  ];
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <header className="shadow-md w-full bg-navbar">
      <div className="flex items-center justify-between py-4 md:px-10 px-7 h-20">
        <div>
          <Link
            to="/"
            className="flex items-center gap-x-2.5 divide-x divide-x-white"
          >
            <img src={icon} className="h-6" />
            <p className="pl-2 text-white">OBSERVATORIO</p>
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl right-8 top-6 cursor-pointer md:hidden text-white"
        >
          {!open ? <MdMenu /> : <MdMenuOpen />}
        </div>

        <ul
          className={`z-10 text-white  md:flex md:items-center md:pb-0  md:static  md:z-auto md:w-auto md:pl-0 left-0 w-full pl-9 absolute transition-all duration-500 ease-in ${
            open ? "top-14 bg-navbar " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.id}
              className="md:ml-8 text-xl md:my-0 my-7 hover:border-b-2"
            >
              <Link to={link.path} onClick={closeMenu}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
