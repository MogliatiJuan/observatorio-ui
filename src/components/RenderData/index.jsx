import { useEffect, useState } from "react";
import { TbFileSearch } from "react-icons/tb";
import { VscLaw } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import MySwal from "@Utils/swal";
import notFoundVerdicts from "@Assets/notFoundVerdicts.png";
import formErrorUpload from "@Assets/formErrorUpload.png";
import Pagination from "../Pagination";
import { axiosFallos } from "../../api";

const RenderData = ({ data, filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    data?.data && updateData(currentPage);
  }, [data, currentPage]);

  const updateData = async (newPage) => {
    const params = {
      ...filter,
      page: newPage,
    };

    try {
      setLoading(true);
      const response = await axiosFallos.get("/api/fallo/", {
        params,
      });
      setCurrentData(response.data.data);
      setNPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        html: `<div class="flex flex-col gap-y-2">
            <img src=${formErrorUpload} alt="carga fallos fallido" />
            <span class="text-lg font-semibold text-title">Hubo un error al cargar los fallos. Intente nuevamente</span>
            </div>`,
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <PulseLoader className="w-max m-auto p-5" color="#434b69" />
        ) : currentData.length === 0 ? (
          <>
            <img
              className="w-1/4 mx-auto"
              src={notFoundVerdicts}
              title="notFoundVerdicts"
            ></img>
            <p className="flex justify-center mb-2">
              No se encontraron resultados
            </p>
          </>
        ) : (
          <div className="mt-4 [&>*:nth-child(2n+1)]:bg-verdictsPrimary [&>*:nth-child(2n+2)]:bg-verdictsSecondary">
            {currentData.map((item) => (
              <div
                className="py-2 px-3 my-3 mx-2 flex justify-between lg:mx-auto rounded-md lg:w-2/3 lg:my-1 lg:px-3 lg:py-1"
                key={item.nroExpediente}
              >
                <div className="flex flex-row flex-wrap gap-x-2 items-center">
                  {item.fecha && (
                    <span className="w-full font-bold text-title text-xl lg:w-fit ">
                      {item.fecha}
                    </span>
                  )}
                  {item.actor && (
                    <>
                      <span>{item.actor}</span>
                      {item.actor &&
                        Array.isArray(item.demandado.length > 0) && <VscLaw />}
                    </>
                  )}
                  {Array.isArray(item.demandado) &&
                    item.demandado.flatMap((dem, index) => (
                      <span key={dem.cuit}>
                        {index === 0 && "|"} {dem.razon_social}
                        {index !== item.etiquetas.length - 1 ? "," : ""}
                      </span>
                    ))}
                  {item.resumen && <span>| {item.resumen} </span>}
                  {Array.isArray(item.etiquetas) &&
                    item.etiquetas.flatMap((tag, index) => (
                      <span key={tag}>
                        {index === 0 && "|"} {tag}
                        {index !== item.etiquetas.length - 1 ? "," : ""}
                      </span>
                    ))}
                  {Array.isArray(
                    item.etiquetas.length > 0 && item.causas.length > 0
                  ) && " | "}
                  {Array.isArray(item.causas) &&
                    item.causas.flatMap((causa, index) => (
                      <span key={causa}>
                        {index === 0 && "|"} {causa}
                        {index !== item.causas.length - 1 ? "," : ""}
                      </span>
                    ))}
                </div>
                <button className="text-[2.5rem] self-start lg:text-[2rem] text-[#2b2f40] lg:self-center cursor-pointer">
                  <Link to={`/buscador/detalle/${item.nroExpediente}`}>
                    <TbFileSearch />
                  </Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {!loading && currentData.length >= 1 && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          updateData={updateData}
        />
      )}
    </>
  );
};

export default RenderData;
