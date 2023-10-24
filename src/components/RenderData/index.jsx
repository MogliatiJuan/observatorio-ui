import { TbFileSearch } from "react-icons/tb";
import { VscLaw } from "react-icons/vsc";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination";
import { axiosFallos } from "../../api";
import { PulseLoader } from "react-spinners";

const RenderData = ({ data, filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const memoizedFilter = useMemo(() => {
    return filter;
  }, [filter]);

  useEffect(() => {
    updateData(currentPage);
  }, [data, currentPage]);

  const updateData = async (newPage) => {
    memoizedFilter.page = newPage;

    try {
      setLoading(true);
      const response = await axiosFallos.get("/api/fallo/", {
        params: memoizedFilter,
      });
      setCurrentData(response.data.data);
      setNPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <PulseLoader className="w-max m-auto p-5" color="#434b69" />
        ) : currentData.length >= 1 ? (
          <div className="mt-4 [&>*:nth-child(2n+1)]:bg-verdictsPrimary [&>*:nth-child(2n+2)]:bg-verdictsSecondary">
            {currentData.map((item) => (
              <div
                className="py-2 px-3 my-3 mx-2 flex justify-between lg:mx-auto rounded-md lg:w-2/3 lg:my-1 lg:px-3 lg:py-1"
                key={item.nroExpediente}
              >
                <div className="flex flex-row flex-wrap gap-x-2 items-center">
                  {item.fecha && (
                    <span className="w-full font-bold text-title text-xl lg:w-fit ">
                      {moment(item.fecha).format("DD/MM/YYYY")}
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
        ) : (
          <>
            <img
              className="w-1/4 mx-auto"
              src="/notFoundVerdicts.png"
              title="notFoundVerdicts"
            ></img>
            <p className="flex justify-center mb-2">
              No se encontraron resultados
            </p>
          </>
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
