import React from "react";
import bgHome from "@Assets/backgroundObs.jpg";
import { Link } from "react-router-dom";
import headerBanner from "@Assets/mainPicture.png";
import Button from "@Components/Button";

const Home = () => {
  return (
    <div className="h-outlet w-full">
      <div
        style={{
          height: "30vh",
          backgroundImage: `url(${headerBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col items-end justify-end"
      >
        <div className="bg-navbar p-4 mb-10" style={{ width: "80%" }}>
          <span className="text-white text-4xl font-bold">
            OBSERVATORIO DE FALLOS DE CONSUMO
          </span>
        </div>
      </div>
      <div className="w-full sm:h-1/2 py-4 px-2 md:px-10 flex justify-center gap-x-8 ">
        <img
          src={bgHome}
          alt="imagen ¿que es el observatorio?"
          className="hidden xl:block"
        />
        <div className="w-full md:w-1/2 flex flex-col gap-y-5 justify-center items-center">
          <h1 className="text-title font-semibold text-3xl sm:text-4xl text-justify whitespace-nowrap">
            ¿Qué es el observatorio?
          </h1>
          <span className="text-black text-base sm:text-xl">
            Es un proyecto comuntario organizado por Usuarios y Consumidores
            Unidos cuyo objetivo es contener, compilar la mayor cantidad de
            antecedentes jurisprudenciales en materia de defensa del consumidor.
          </span>
        </div>
      </div>
      <div>
        <div className="w-1/2 mx-auto">
          <Link to={"/buscador"}>
            <Button children={"Buscar Fallos"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
