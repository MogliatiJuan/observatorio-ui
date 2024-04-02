import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { axiosFallos } from "../../api";
import { Loader } from "@Components";
import notFoundVerdicts from "@Assets/notFoundVerdicts.png";
import errorDetailView from "@Assets/errorDetailView.png";
import MySwal from "@Utils/swal";
import Spinner from "../Loader";
import { DataContext } from "../../context/selectsContext";
import DetailContent from "./detailContent";

dayjs.extend(customParseFormat);

const DetailView = () => {
  const { id = null } = useParams();
  const [detail, setDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [editableDetail, setEditableDetail] = useState(null);

  const { isLoading } = useContext(DataContext);
  const { register, watch, setValue, reset } = useForm();

  const isAdmin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    axiosFallos
      .get(`/api/fallo/${id}`)
      .then((apiData) => {
        setDetail(apiData.data);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((error) => {
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
  }, [id, reloadData]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditableDetail({ ...detail });
  };

  const handleChange = (name, value) => {
    setEditableDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (values) => {
    const formData = new FormData();
    if (
      values.ciudad === null ||
      values.juzgado === null ||
      values.provincia === null
    ) {
      values.ciudad = null;
      values.juzgado = null;
      values.provincia = null;
    }
    delete values.punitivo;
    delete values.moral;
    delete values.patrimonial;
    watch("file")?.length > 0 && formData.append("file", values?.file[0]);
    const iterableData = { ...editableDetail, ...values };
    Object.keys(iterableData).forEach((key) => {
      if (key !== "file") {
        if (Array.isArray(iterableData[key])) {
          iterableData[key].forEach((value) => {
            formData.append(key, parseInt(value.value || value.id));
          });
        } else if (
          typeof iterableData[key] === "object" &&
          (iterableData[key]?.value ||
            iterableData[key]?.id ||
            iterableData[key]?.id === 0) // para tomar el id de valor 0
        ) {
          formData.append(
            key,
            parseInt(iterableData[key]?.value || iterableData[key]?.id)
          );
        } else {
          formData.append(key, iterableData[key]);
        }
      }
    });
    await axiosFallos.put(`/api/fallo/${id}`, formData);
    setReloadData(!reloadData);
    reset();
    setIsEditing(false);
  };

  if (isLoading) {
    return <Loader />;
  }

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
        <DetailContent
          isAdmin={isAdmin}
          isEditing={isEditing}
          handleSave={handleSave}
          detail={detail}
          editableDetail={editableDetail}
          handleEdit={handleEdit}
          handleChange={handleChange}
          setValue={setValue}
          register={register}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default DetailView;
