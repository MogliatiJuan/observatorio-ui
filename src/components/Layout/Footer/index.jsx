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
        <div className="flex flex-wrap justify-evenly py-5">
          <div>
            <h3 className="text-white text-xl pb-1">Contacto</h3>
            <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
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
            <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
            <div className="leading-loose">
              <div>
                {Navigation.map((link) => (
                  <li
                    key={link.id}
                    className="text-white list-none relative overflow-hidden"
                  >
                    <Link to={link.path} className="relative z-10 group">
                      {link.name}
                      <span className="absolute w-full h-0.5 bg-blue-500 bottom-0 left-0 transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100 group-hover:opacity-100 opacity-0"></span>
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl pb-1">Ubicación y Mapa</h3>
            <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.5918533455238!2d-60.220077100000005!3d-33.3294843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7678dabdccbff%3A0x36f0a5a310bd65f2!2sUrquiza%20107%2C%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1695860790199!5m2!1ses-419!2sar"
              width="400"
              height="300"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transform transition-transform hover:scale-105"
            ></iframe>
          </div>
        </div>
        <p className="py-1 flex justify-center items-center gap-x-1 text-white">
          <MdCopyright /> Usuarios y Consumidores Unidos - Buenos Aires. Todos
          los derechos reservados.
        </p>
      </footer>
    </>
  );
};
export default Footer;
