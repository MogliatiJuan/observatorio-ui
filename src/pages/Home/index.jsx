import snInsignia from "@Assets/sn-logos/insignia.png";

const Home = () => {
  return (
    <div className="w-full h-full bg-zinc-800 flex flex-col justify-center items-center gap-y-3">
      <div className="w-80">
        <img src={snInsignia} alt="Logo insignia de la ciudad" />
      </div>
      <div className="text-center">
        <p className="text-white text-2xl font-semibold">
          ¡Éxitos en tu nuevo proyecto!
        </p>
        <p className="text-gray-400	">
          Secretaría de Innovación y Transformación Digital
        </p>
      </div>
    </div>
  );
};

export default Home;
