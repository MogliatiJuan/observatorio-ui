import React, { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineArrowBack, MdScatterPlot } from "react-icons/md";
import { axiosFallos } from "../../api";
import { Card } from "@Components";
import corregirCodificacion from "@Utils/corregirCodificacion";
import notFoundVerdicts from "@Assets/notFoundVerdicts.png";
import errorDetailView from "@Assets/errorDetailView.png";
import MySwal from "@Utils/swal";
import Spinner from "../Loader";

const DetailView = () => {
  const { id = null } = useParams();
  const history = useNavigate();
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
            className="bg-navbar text-white font-bold py-2 px-4 rounded w-fit mx-auto"
          >
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

  const shareButtons = [
    { icon: XIcon, button: TwitterShareButton },
    { icon: FacebookIcon, button: FacebookShareButton },
    { icon: WhatsappIcon, button: WhatsappShareButton },
  ];

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
            detail ? "h-full" : "h-outlet"
          } w-full md:w-[95%] mx-auto lg:w-2/3 bg-white`}
        >
          <div className="w-full pt-1.5 px-5 flex flex-col flex-wrap justify-between text-title text-3xl font-bold">
            <button
              onClick={() => history(-1)}
              className="flex items-center gap-x-2"
            >
              <MdOutlineArrowBack />
              Volver
            </button>
          </div>

          <section className="flex flex-col mb-2 gap-y-2 md:gap-y-3 lg:px-5 lg:shadow-lg">
            <div className="flex flex-row justify-between px-3 md:p-0 font-black text-title text-3xl">
              <h1>DETALLE DEL FALLO</h1>
              <span>{detail.fecha}</span>
            </div>
            <Card title="Resumen">
              <p className="pl-2">{detail.resumen}</p>
            </Card>
            <Card title="Demandante/s">
              <div className="flex flex-row items-baseline">
                <p className="uppercase">{detail.actor}</p>
              </div>{" "}
            </Card>
            <Card title="Demandado/s">
              {detail.demandado.map((ente) => (
                <div key={ente.cuit} className="flex flex-row items-baseline">
                  <div
                    className="w-fit flex flex-row flex-wrap gap-x-2"
                    key={ente.cuit}
                  >
                    <p className="uppercase">- {ente.razon_social}</p>
                    <p>/ CUIT: {ente.cuit}</p>
                  </div>
                </div>
              ))}
            </Card>
            <div className="flex gap-x-2">
              <div className="w-1/2">
                <Card title="Causas del Fallo">
                  {detail.causas.map((causa) => (
                    <p className="pl-2" key={causa}>
                      {causa}
                    </p>
                  ))}{" "}
                </Card>
              </div>
              <div className="w-1/2">
                <Card title="Juzgado">
                  {detail.juzgado || detail.Ciudad || detail.Provincia ? (
                    <p className="pl-2">
                      {corregirCodificacion(detail.juzgado)}{" "}
                      {detail.juzgado && "- "}
                      {corregirCodificacion(detail.Ciudad)}{" "}
                      {detail.Ciudad && "- "}
                      {corregirCodificacion(detail.Provincia)}
                    </p>
                  ) : (
                    <p className="pl-2">No se aplicó juzgado respectivo</p>
                  )}
                </Card>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-1/2">
                <Card title="Tipo de Juicio">
                  <p className="pl-2">{detail.tipoJuicio}</p>
                </Card>
              </div>
              <div className="w-1/2">
                <Card title="Rubro">
                  {detail.rubro.map((rub) => (
                    <p className="pl-2" key={rub}>
                      {rub}
                    </p>
                  ))}
                </Card>
              </div>
            </div>

            {(detail.punitivo || detail.moral || detail.patrimonial) && (
              <>
                <Card title="Valores asociados">
                  {detail.punitivo && (
                    <p className="pl-2 gap-x-1 flex items-center">
                      <MdScatterPlot />
                      Daño Punitivo:{" "}
                      {parseInt(detail.punitivo).toLocaleString("es-AR")}
                    </p>
                  )}
                  {detail.moral && (
                    <p className="pl-2 gap-x-1 flex items-center">
                      <MdScatterPlot />
                      Daño Moral:{" "}
                      {parseInt(detail.moral).toLocaleString("es-AR")}
                    </p>
                  )}
                  {detail.patrimonial && (
                    <p className="pl-2 gap-x-1 flex items-center">
                      <MdScatterPlot />
                      Daño Patrimonial:{" "}
                      {parseInt(detail.patrimonial).toLocaleString("es-AR")}
                    </p>
                  )}
                </Card>
              </>
            )}
            {detail.etiquetas.length > 0 && (
              <div className="flex flex-col flex-wrap gap-y-1">
                <Card title="Etiquetas relacionadas">
                  <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
                    {detail.etiquetas.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-light_grey capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )}
            {detail.files.length > 0 && (
              <Card title="Archivos adjuntos">
                <div className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-2">
                  {detail.files.map((file, index) => {
                    return (
                      <button
                        key={file.file}
                        className="px-4 py-2 rounded-sm bg-verdictsPrimary"
                        onClick={() => openModal(detail.files[index])}
                      >
                        Ver Documento Adjunto {index + 1}
                      </button>
                    );
                  })}
                </div>
              </Card>
            )}

            <Card title="Compartir en Redes Sociales">
              <div className="flex flex-row flex-wrap gap-x-3 justify-center">
                {shareButtons.map((shareButton, index) => (
                  <shareButton.button
                    key={index}
                    url={window.location.origin + window.location.pathname}
                    title="¡Nuevo fallo judicial! ¿Qué opinan ustedes? #FalloJudicial #JusticiaAbierta"
                    hashtag="¡Nuevo fallo judicial! ¿Qué opinan ustedes? #FalloJudicial #JusticiaAbierta"
                  >
                    <shareButton.icon size={42} round />
                  </shareButton.button>
                ))}
              </div>
            </Card>
          </section>
        </div>
      )}
    </>
  );
};

export default DetailView;
