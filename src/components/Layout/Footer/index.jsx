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
    { name: "Delegaciones en todo el país", id: 1 },
    { name: "Sede Urquiza 107 bis - San Nicolas", id: 2 },
    { name: "Teléfono: (336) 4444444", id: 3 },
  ];
  return (
    <>
      <footer className="bg-slate-800 flex flex-wrap justify-evenly py-5">
        <div>
          <h3 className="text-white text-xl pb-1">Contacto</h3>
          <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
          <div className="leading-loose">
            {Contact.map((cont) => (
              <p key={cont.id} className="text-white">
                {cont.name}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl pb-1">Navegación</h3>
          <hr className="w-8 border-t-2 pb-6 border-blue-500"></hr>
          <div className="leading-loose">
            <div>
              {Navigation.map((link) => (
                <li key={link.id} className="text-white list-none">
                  <Link to={link.path}>{link.name}</Link>
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
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </footer>
    </>
  );
};
export default Footer;
