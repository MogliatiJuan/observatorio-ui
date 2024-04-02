import React, { createContext, useState, useEffect } from "react";
import { axiosFallos } from "@Api/index.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    empresas: [],
    tiposJuicio: [],
    causas: [],
    rubros: [],
    provincias: [],
    etiquetas: [],
    divisas: [],
    isLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        empresasResponse,
        tiposJuicioResponse,
        causasResponse,
        rubrosResponse,
        provinciasResponse,
        etiquetasResponse,
        divisasResponse,
      ] = await Promise.all([
        axiosFallos.get("/api/datos/empresas"),
        axiosFallos.get("/api/datos/tipojuicio"),
        axiosFallos.get("/api/datos/reclamos"),
        axiosFallos.get("/api/datos/rubros"),
        axiosFallos.get("/api/datos/provincias"),
        axiosFallos.get("/api/datos/etiquetas"),
        axiosFallos.get("/api/datos/divisas"),
      ]);

      // Aquí actualizamos el estado `data` directamente con `setData`
      setData({
        empresas: empresasResponse.data,
        tiposJuicio: tiposJuicioResponse.data,
        causas: causasResponse.data,
        rubros: rubrosResponse.data,
        provincias: provinciasResponse.data,
        etiquetas: etiquetasResponse.data,
        divisas: divisasResponse.data,
        isLoading: false, // Actualizamos el estado de carga a `false`
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setData((prevState) => ({ ...prevState, isLoading: false })); // Si hay un error, igual dejamos de cargar
    }
  };

  return (
    <DataContext.Provider value={{ ...data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
