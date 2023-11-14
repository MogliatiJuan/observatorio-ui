import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBack, MdScatterPlot } from "react-icons/md";
import { CgShapeHalfCircle } from "react-icons/cg";
import { TbBuildingFactory2 } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa";
import { axiosFallos } from "../../api";
import corregirCodificacion from "@Utils/corregirCodificacion";
import notFoundVerdicts from "@Assets/notFoundVerdicts.png";
import errorDetailView from "@Assets/errorDetailView.png";
import MySwal from "@Utils/swal";
import Spinner from "../Loader";

const DetailView = () => {
  const { id = null } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axiosFallos
      .get(`/api/fallo/${id}`)
      .then((apiData) => {
        setDetail(apiData.data);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error(error);
        MySwal.fire({
          showCancelButton: true,
          showConfirmButton: true,
          html: `<div class="flex flex-col gap-y-2">
            <img src=${errorDetailView} alt="carga detalle fallido" />
            <span class="text-lg font-semibold text-title">Hubo un error al cargar el detalle del fallo. Intente nuevamente</span>
            </div>`,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Ver detalle de error",
        }).then((res) => {
          if (res.isConfirmed) {
            MySwal.fire({
              title: "Detalle del Error",
              text: `${error?.response?.data.status} - ${
                error?.response?.data?.error || error?.response?.data?.code
              } - ${error?.response?.data?.message} ${
                error?.response?.data?.details !== null
                  ? `- ${error?.response?.data?.details}`
                  : ""
              }`,
              showConfirmButton: true,
              confirmButtonText: "Aceptar",
            });
          }
        });
      });
  }, [id]);

  const closeModal = () => {
    MySwal.close();
  };

  const openModal = (file) => {
    MySwal.fire({
      html: (
        <div className="w-full h-full mx-auto flex flex-col gap-y-1">
          <a href={file.url} target="_blank">
            Visualizar en pantalla completa ➚
          </a>
          <iframe
            key={file.file}
            src={file.url}
            title={file.file}
            className="h-full md:w-full lg:w-full lg:h-full"
          />
          <button
            onClick={closeModal}
            className="bg-navbar text-white font-bold py-2 px-4 rounded w-fit mx-auto">
            Cerrar
          </button>
        </div>
      ),
      customClass: {
        popup: "w-[90vw] h-[70vh] md:h-[80vh] lg:w-[80vw] lg:h-[90vh]",
        htmlContainer: "h-full  ",
      },
      showConfirmButton: false,
    });
  };

  const getIconClass = (file) =>
    file?.split(".")[1].toLowerCase() === "pdf" ? "pdf" : "image";

  return (
    <>
      {detail == null ? (
        <div className="h-outlet flex justify-center">
          <Spinner />
        </div>
      ) : detail.length === 0 ? (
        <>
          <img
            className="w-1/5 mx-auto"
            src={notFoundVerdicts}
            title="notFoundVerdicts"
            alt="No se encontraron resultados"
          />
          <p className="flex justify-center">No se encontraron resultados</p>
        </>
      ) : (
        <div
          className={`${
            detail ? "h-full mb-3" : "h-outlet "
          } w-[95%] mx-auto lg:w-11/12`}>
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
              <div key={ente.cuit} className="flex items-baseline pl-2">
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
                <p className="pl-2">
                  {detail.Provincia} - {detail.Ciudad} -{" "}
                  {corregirCodificacion(detail.juzgado)}
                </p>
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

            {detail.rubro.length > 0 && (
              <h3 className={`text-2xl text-title font-semibold`}>Rubro</h3>
            )}
            {detail.rubro.map((rub) => (
              <p className="pl-2" key={rub}>
                {rub}
              </p>
            ))}

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
            <div className="w-full ml-2 mx-auto h-full flex flex-col gap-y-3 lg:flex-row lg:flex-wrap lg:w-full lg:gap-0 lg:gap-x-6">
              {detail.files.map((file) =>
                getIconClass(file.file) === "pdf" ? (
                  <button
                    className="flex items-baseline"
                    key={file.file}
                    onClick={() => openModal(file)}>
                    <FaFilePdf className="h-8 w-8" />
                  </button>
                ) : (
                  <img
                    key={file.file}
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
