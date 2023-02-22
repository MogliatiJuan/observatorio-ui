import React from "react";
import bgHome from "@Assets/backgroundObs.jpg";
import TitlePage from "@Components/TitlePage";

const Home = () => {
  return (
    <div className="h-outlet w-full ">
      <TitlePage title="Observatorio de fallos de consumo" />
      <div className="w-full h-1/2 py-4 px-2 md:px-10  flex justify-center gap-x-8 ">
        <img
          src={bgHome}
          alt="imagen representativa"
          className="hidden xl:block"
        />
        <div className="w-full md:w-1/2 flex flex-col gap-y-5 justify-center items-center">
          <h1 className="text-subtitle text-4xl text-center whitespace-nowrap">
            ¿Qué es el observatorio?
          </h1>
          <span className="text-black">
            Es un proyecto comuntario organizado por Usuarios y Consumidores
            Unidos cuyo objetivo es contener, compilar la mayor cantidad de
            antecedentes jurisprudenciales en materia de defensa del consumidor.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
