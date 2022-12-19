import iconTest from "@Assets/balance.png";

const Home = () => {
  return (
    <div className="w-full h-full bg-zinc-800 flex flex-col justify-center items-center gap-y-3">
      <div className="w-80">
        <img src={iconTest} alt="Logo insignia observatorio" />
      </div>
      <div className="text-center">
        <p className="text-white text-2xl font-semibold">¡Hola mundo!</p>
        <p className="text-gray-400	">
          <> Mercado & Acosta </>
        </p>
      </div>
    </div>
  );
};

export default Home;
