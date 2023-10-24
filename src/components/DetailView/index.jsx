import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBack, MdScatterPlot } from "react-icons/md";
import { CgShapeHalfCircle } from "react-icons/cg";
import { TbBuildingFactory2 } from "react-icons/tb";
import { PulseLoader } from "react-spinners";
import { axiosFallos } from "../../api";
import { corregirCodificacion } from "../../utils";

const DetailView = () => {
  const { id = null } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axiosFallos
      .get(`/api/fallo/${id}`)
      .then((apiData) => {
        setDetail(apiData.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const getIconClass = (file) =>
    file?.split(".")[1].toLowerCase() === "pdf" ? "pdf" : "image";

  return (
    <>
      {detail == null ? (
        <div className="flex justify-center items-center h-outlet">
          <PulseLoader className="w-max p-5" color="#434b69" />
        </div>
      ) : detail.length === 0 ? (
        <>
          <img
            className="w-1/4 mx-auto"
            src="/notFoundVerdicts.png"
            title="notFoundVerdicts"
            alt="No se encontraron resultados"
          />
          <p className="flex justify-center">No se encontraron resultados</p>
        </>
      ) : (
        <div className="h-outlet w-[95%] mx-auto lg:w-11/12">
          <h1 className="text-3xl items-center w-max pt-4 flex gap-x-2 lg:text-4xl text-title font-bold">
            <Link to="/buscador">
              <MdOutlineArrowBack />
            </Link>
            Detalle del Fallo Judicial
          </h1>

          <section className="pt-2 lg:pt-8 lg:pl-4">
            <div className="flex justify-between lg:justify-between">
              <div>
                {detail.actor && (
                  <>
                    <h3 className="text-2xl text-title font-semibold">
                      Demandante
                    </h3>
                    <p className="pl-2">{detail.actor}</p>
                  </>
                )}
              </div>
              <div>
                {detail.fecha && (
                  <span className="m-0 font-bold text-title text-3xl p-1 rounded-md shadow-md lg:mr-20">
                    {detail.fecha}
                  </span>
                )}
              </div>
            </div>

            {detail.demandado.length > 0 && (
              <h3 className={`text-2xl text-title font-semibold`}>
                Demandados
              </h3>
            )}

            {detail.demandado.map((ente) => (
              <div className="flex items-baseline pl-2">
                <span>
                  <TbBuildingFactory2 />
                </span>
                <div className="pl-2 w-fit" key={ente.cuit}>
                  <p className="font-semibold">
                    Razon Social:
                    <span className="font-normal"> {ente.razon_social}</span>
                  </p>
                  <p className="font-semibold border-b border-title">
                    CUIT:<span className="font-normal"> {ente.cuit}</span>
                  </p>
                </div>
              </div>
            ))}

            {detail.causas.length > 0 && (
              <h3 className={`text-2xl text-title font-semibold`}>
                Causas del Fallo
              </h3>
            )}
            {detail.causas.map((causa) => (
              <p className="pl-2" key={causa}>
                {causa}
              </p>
            ))}

            {detail.juzgado && (
              <>
                <h3 className={`text-2xl text-title font-semibold`}>Juzgado</h3>
                <p className="pl-2">{corregirCodificacion(detail.juzgado)}</p>
              </>
            )}

            {detail.tipoJuicio && (
              <>
                <h3 className={`text-2xl text-title font-semibold`}>
                  Tipo de Juicio
                </h3>
                <p className="pl-2">{detail.tipoJuicio}</p>
              </>
            )}

            {detail.rubro && (
              <>
                <h3 className={`text-2xl text-title font-semibold`}>Rubro</h3>
                <p className="pl-2">{detail.rubro}</p>
              </>
            )}

            {(detail.punitivo || detail.moral || detail.patrimonial) && (
              <>
                <h3 className={`text-2xl text-title font-semibold`}>
                  Valores asociados
                </h3>
                {detail.punitivo && (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Punitivo: {detail.punitivo}
                  </p>
                )}
                {detail.moral && (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Moral: {detail.moral}
                  </p>
                )}
                {detail.patrimonial && (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Patrimonial: {detail.patrimonial}
                  </p>
                )}
              </>
            )}

            {detail.files.length > 0 && (
              <h3 className={`text-2xl text-title font-semibold`}>
                Archivos adjuntos
              </h3>
            )}
            <div className="w-full mx-auto h-full flex flex-col gap-y-3 items-center justify-evenly lg:flex-row lg:flex-wrap lg:w-11/12 lg:gap-0 ">
              {detail.files.map((file) =>
                getIconClass(file.file) === "pdf" ? (
                  <iframe
                    key={file.file}
                    src={file.url}
                    title={file.file}
                    className="w-2/5 lg:h-96"
                  />
                ) : (
                  <img
                    src={file.url}
                    alt={file.file}
                    className="w-11/12 object-contain lg:w-2/5 lg:h-72"
                  />
                )
              )}
            </div>

            {detail.etiquetas.length > 0 && (
              <h3 className={`text-2xl text-title font-semibold`}>
                Etiquetas relacionadas
              </h3>
            )}
            {detail.etiquetas.map((tag) => (
              <p className="pl-2 flex items-center gap-x-2" key={tag}>
                <CgShapeHalfCircle /> {tag}
              </p>
            ))}

            {detail.resumen && (
              <>
                <h3 className={`text-2xl text-title font-semibold`}>
                  Resumen del Fallo
                </h3>
                <p className="pl-2">{detail.resumen}</p>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default DetailView;
