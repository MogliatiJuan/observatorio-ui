import {
  MdFilterCenterFocus,
  MdOutlineLocationOn,
  MdPhone,
  MdCopyright,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const Navigation = [
    { name: "Página Principal", path: "/principal", id: 1 },
    { name: "Subir Fallo", path: "/cargafallo", id: 2 },
    { name: "Fallos", path: "/fallos", id: 3 },
    { name: "Buscador", path: "/buscador", id: 4 },
    { name: "Ingresar", path: "/logIn", id: 5 },
  ];

  const Contact = [
    {
      name: "Delegaciones en todo el país",
      id: 1,
      icon: <MdFilterCenterFocus />,
    },
    {
      name: "Sede Urquiza 107 bis - San Nicolas",
      id: 2,
      icon: <MdOutlineLocationOn />,
    },
    { name: "Teléfono: (336) 4444444", id: 3, icon: <MdPhone /> },
  ];

  return (
    <>
      <footer className="bg-slate-800">
        <div className="py-2 px-5 flex flex-wrap gap-y-2 md:justify-between lg:justify-evenly lg:flex-nowrap lg:py-5 lg:px-0">
          <div>
            <h3 className="text-white text-xl pb-1">Contacto</h3>
            <hr className="w-8 pb-3 border-t-2 border-blue-500 lg:pb-6"></hr>
            <div className="leading-loose">
              {Contact.map((cont) => (
                <div key={cont.id} className="flex items-center gap-x-2">
                  <span className="text-white text-xl">{cont.icon}</span>
                  <p className="text-white">{cont.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl pb-1">Navegación</h3>
            <hr className="w-8 border-t-2 pb-3 border-blue-500 lg:pb-6"></hr>
            <div className="leading-loose">
              {Navigation.map((link) => (
                <li
                  key={link.id}
                  className="text-white list-none relative overflow-hidden">
                  <Link to={link.path} className="relative z-10 group">
                    {link.name}
                    <span className="absolute w-full h-0.5 bg-blue-500 bottom-0 left-0 transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100 group-hover:opacity-100 opacity-0"></span>
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <div className="w-full md:w-fit lg:w-fit">
            <h3 className="text-white text-xl pb-1">Ubicación y Mapa</h3>
            <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
            <div className="w-full flex justify-center lg:w-fit lg:inline-block">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.5918533455238!2d-60.220077100000005!3d-33.3294843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7678dabdccbff%3A0x36f0a5a310bd65f2!2sUrquiza%20107%2C%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1695860790199!5m2!1ses-419!2sar"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transform transition-transform hover:scale-105 w-[300px] h-[300px] md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[300px]"></iframe>
            </div>
          </div>
        </div>
        <p className="w-full py-2 px-5 flex flex-wrap justify-center items-center gap-x-1 text-white">
          <MdCopyright className="text-3xl" /> Usuarios y Consumidores Unidos -
          Buenos Aires. Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
};
export default Footer;
