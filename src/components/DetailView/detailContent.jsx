import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack, MdScatterPlot } from "react-icons/md";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { Card, Input } from "@Components";
import formatDate from "@Utils/formatearFecha";
import corregirCodificacion from "@Utils/corregirCodificacion";
import MySwal from "@Utils/swal";
import { axiosFallos } from "@Api";
import { DataContext } from "../../context/selectsContext";

const DetailContent = ({
  isAdmin,
  isEditing,
  detail,
  editableDetail,
  handleChange,
  handleEdit,
  handleSave,
  setIsEditing,
}) => {
  const {
    empresas,
    tiposJuicio,
    causas,
    rubros,
    provincias,
    etiquetas,
    divisas,
  } = useContext(DataContext);
  const {
    register,
    watch,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const history = useNavigate();

  const [ciudadesState, setCiudadesState] = useState([]);
  const [tribunalesState, setTribunalesState] = useState([]);
  const provinciaSelected = watch("provincia");
  const ciudadSelected = watch("ciudad");

  useEffect(() => {
    handleChangeProvincia({
      ...detail?.provincia,
      value: detail?.provincia?.id,
    });
    handleChangeCiudad({
      ...detail?.ciudad,
      value: detail?.ciudad?.id,
    });
    setValue("fecha", detail?.fecha);
    setValue("resumen", detail?.resumen);
    setValue("actor", detail?.actor);
    setValue(
      "demandado",
      detail.demandado.map((d) => ({
        value: d.id,
        label: corregirCodificacion(d.razon_social),
        razon_social: corregirCodificacion(d.razon_social),
        cuit: d.cuit,
      }))
    );
    setValue(
      "causas",
      detail.causas.map((c) => ({
        value: c?.id,
        label: corregirCodificacion(c?.nombre.toUpperCase()),
        nombre: corregirCodificacion(c?.nombre.toUpperCase()),
      }))
    );
    setValue("tipoJuicio", {
      id: detail?.tipoJuicio?.id,
      label: detail?.tipoJuicio?.nombre,
      nombre: detail?.tipoJuicio?.nombre,
    });
    setValue(
      "rubro",
      detail.rubro.map((r) => ({
        value: r?.id,
        label: r?.nombre,
        nombre: r?.nombre,
      }))
    );
    setValue(
      "etiquetas",
      detail.etiquetas.map((e) => ({
        value: e?.id,
        label: e?.nombre,
        nombre: e?.nombre,
      }))
    );
    setValue("moral", detail?.moral);
    setValue("patrimonial", detail?.patrimonial);
    setValue("punitivo", detail?.punitivo);
    setValue("divisa", {
      value: detail?.divisa?.id,
      label: detail?.divisa?.nombre,
    });
    detail?.provincia?.id &&
      setValue("provincia", {
        value: detail?.provincia?.id,
        label: corregirCodificacion(detail?.provincia?.nombre),
        nombre: corregirCodificacion(detail?.provincia?.nombre),
      });
    detail?.ciudad?.nombre &&
      setValue("ciudad", {
        value: detail?.ciudad?.id,
        label: corregirCodificacion(detail?.ciudad?.nombre),
        nombre: corregirCodificacion(detail?.ciudad?.nombre),
      });
    (detail?.juzgado?.id || detail?.juzgado?.id === 0) &&
      setValue("juzgado", {
        value: detail?.juzgado?.id,
        label: corregirCodificacion(detail?.juzgado?.nombre),
        nombre: corregirCodificacion(detail?.juzgado?.nombre),
      });
  }, [isEditing]);

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

  const closeModal = () => {
    MySwal.close();
  };

  const handleSaveButtonClick = () => {
    const values = getValues(); // Obtener los valores del formulario
    handleSave(values); // Llamar a la función handleSave con los valores del formulario
    reset();
  };

  const handleChangeProvincia = async (selectedOption) => {
    try {
      setValue("ciudad", null);
      setValue("juzgado", null);
      setCiudadesState([]);
      if (selectedOption !== null) {
        const response = await axiosFallos.get(
          `/api/datos/ciudades?idProvincia=${selectedOption.value}`
        );
        setCiudadesState(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeCiudad = async (selectedOption) => {
    try {
      setValue("juzgado", null);
      setTribunalesState([]);

      if (selectedOption !== null) {
        const response = await axiosFallos.get(
          `/api/datos/juzgados?idCiudad=${selectedOption.value}`
        );
        setTribunalesState(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const courtFields = [
    {
      name: "provincia",
      type: "select",
      label: "Provincia",
      placeholder: "Seleccione una provincia",
      noOptionsMessage: "No hay una provincia coincidente",
      options: provincias.map((provincia) => ({
        ...provincia,
        value: provincia.id,
        label: corregirCodificacion(provincia.nombre),
      })),
      onchange: handleChangeProvincia,
      register: register,
      errors: errors,
      setValue: setValue,
      control: control,
    },
    {
      name: "ciudad",
      type: "select",
      label: "Ciudad",
      placeholder: "Seleccione una ciudad",
      noOptionsMessage: "No hay una ciudad coincidente",
      options: ciudadesState.map((ciudad) => ({
        ...ciudad,
        value: ciudad.id,
        label: corregirCodificacion(ciudad.nombre),
      })),
      register: register,
      errors: errors,
      disabled: !provinciaSelected,
      onchange: handleChangeCiudad,
      setValue: setValue,
      control: control,
    },
    {
      name: "juzgado",
      type: "select",
      label: "Tribunal",
      placeholder: "Seleccione un tribunal",
      noOptionsMessage: "No hay un tribunal coincidente",
      options: tribunalesState.map((tribunal) => ({
        ...tribunal,
        value: tribunal.id,
        label: corregirCodificacion(tribunal.nombre),
      })),
      register: register,
      errors: errors,
      disabled: !ciudadSelected,
      setValue: setValue,
      control: control,
    },
  ];

  const shareButtons = [
    { icon: XIcon, button: TwitterShareButton },
    { icon: FacebookIcon, button: FacebookShareButton },
    { icon: WhatsappIcon, button: WhatsappShareButton },
  ];

  return (
    <div
      className={`${
        detail ? "h-full" : "h-outlet"
      } w-full md:w-[95%] mx-auto lg:w-2/3 bg-white`}
    >
      <div className="w-full pt-1.5 px-5 flex flex-row flex-wrap justify-between text-title text-3xl font-bold">
        <button
          onClick={() => history(-1)}
          className="flex items-center gap-x-2"
        >
          <MdOutlineArrowBack />
          Volver
        </button>
        {isAdmin && (
          <div>
            {!isEditing && <button onClick={handleEdit}>Editar</button>}
            {isEditing && (
              <button className="mr-3" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            )}{" "}
            {isEditing && (
              <button onClick={handleSaveButtonClick}>Guardar</button>
            )}
          </div>
        )}
      </div>

      <section className="flex flex-col pb-2 gap-y-2 mx-1.5 sm:mx-0 sm:px-3 md:gap-y-3 lg:px-5 lg:shadow-lg">
        <div className="flex flex-row justify-between px-2 md:px-3 font-black text-title text-3xl">
          <h1>DETALLE DEL FALLO</h1>
          {!isEditing ? (
            <span>{detail.fecha}</span>
          ) : (
            <input
              name="fecha"
              type="text"
              value={editableDetail.fecha}
              onChange={(e) =>
                handleChange("fecha", formatDate(e.target.value))
              }
              className="w-32 text-center"
            />
          )}
        </div>
        <Card title="Resumen">
          {!isEditing ? (
            <p className="pl-2">{detail.resumen}</p>
          ) : (
            <input
              name="resumen"
              type="text"
              value={editableDetail.resumen}
              onChange={(e) => handleChange("resumen", e.target.value)}
            />
          )}
        </Card>
        <Card title="Demandante/s">
          <div className="flex flex-row items-baseline">
            {!isEditing ? (
              <p className="uppercase">{detail.actor}</p>
            ) : (
              <input
                name="actor"
                type="text"
                value={editableDetail.actor}
                onChange={(e) => handleChange("actor", e.target.value)}
              />
            )}
          </div>
        </Card>
        <Card title="Demandado/s">
          {!isEditing ? (
            detail.demandado.length > 0 ? (
              detail.demandado.map((ente) => (
                <div key={ente.cuit} className="flex flex-row items-baseline">
                  <div
                    className="w-fit flex flex-row flex-wrap gap-x-2"
                    key={ente.cuit}
                  >
                    <p className="uppercase">- {ente.razon_social}</p>
                    <p>/ CUIT: {ente.cuit}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No se seleccionaron demandados</p>
            )
          ) : (
            <Input
              key="demandado"
              name="demandado"
              label="Demandado"
              type="select"
              options={empresas?.map((empresa) => ({
                ...empresa,
                value: empresa.id,
                label: corregirCodificacion(empresa.razon_social),
              }))}
              placeholder="Seleccione un demandado"
              register={register}
              errors={errors}
              validation="Es obligatorio cargar un demandado"
              setValue={setValue}
              control={control}
              noOptionsMessage="No hay un demandado coincidente"
              isMulti={true}
              onchange={(e) => handleChange("demandado", e)}
            />
          )}
        </Card>
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2">
          <div className="w-full sm:w-1/2">
            <Card title="Causas del Fallo">
              {!isEditing ? (
                detail.causas.length > 0 ? (
                  detail.causas.map((causa) => (
                    <p className="pl-2" key={causa.nombre}>
                      {causa.nombre}
                    </p>
                  ))
                ) : (
                  <p>No se seleccionaron causas</p>
                )
              ) : (
                <Input
                  key="causas"
                  name="causas"
                  label="Causas del Fallo"
                  type="select"
                  options={causas?.map((causa) => ({
                    ...causa,
                    value: causa.id,
                    label: corregirCodificacion(causa.description),
                    nombre: corregirCodificacion(causa.description),
                  }))}
                  placeholder="Causas del Fallo"
                  register={register}
                  errors={errors}
                  validation="Es obligatorio cargar una causa del reclamo"
                  setValue={setValue}
                  control={control}
                  noOptionsMessage="No hay una causa del reclamo coincidente"
                  isMulti={true}
                  onchange={(e) => handleChange("causas", e)}
                />
              )}
            </Card>
          </div>
          <div className="w-full sm:w-1/2">
            <Card title="Juzgado">
              {!isEditing ? (
                detail?.juzgado?.nombre ||
                detail?.ciudad?.nombre ||
                detail?.provincia?.nombre ? (
                  <p className="pl-2">
                    {detail?.juzgado?.nombre &&
                      corregirCodificacion(detail?.juzgado?.nombre)}
                    {detail?.juzgado?.nombre && " - "}
                    {detail?.ciudad?.nombre &&
                      corregirCodificacion(detail?.ciudad?.nombre)}
                    {detail?.ciudad?.nombre && " - "}
                    {detail?.provincia?.nombre &&
                      corregirCodificacion(detail?.provincia?.nombre)}
                  </p>
                ) : (
                  <p className="pl-2">No se aplicó juzgado respectivo</p>
                )
              ) : (
                courtFields.map((field) => (
                  <Input
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    options={field.options}
                    placeholder={field.placeholder}
                    register={register}
                    errors={errors}
                    validation={field.validation}
                    setValue={setValue}
                    control={control}
                    noOptionsMessage={field.noOptionsMessage}
                    isMulti={field.isMulti ? field.isMulti : false}
                    onchange={(e) => {
                      handleChange(field.name, e);
                      field?.onchange && field.onchange(e);
                    }}
                    disabled={field.disabled}
                  />
                ))
              )}
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2">
          <div className="w-full sm:w-1/2">
            <Card title="Tipo de Juicio">
              {!isEditing ? (
                <p className="pl-2">{detail.tipoJuicio.nombre}</p>
              ) : (
                <Input
                  key="tipoJuicio"
                  name="tipoJuicio"
                  label="Tipo de juicio"
                  type="select"
                  options={tiposJuicio?.map((tipoJuicio) => ({
                    ...tipoJuicio,
                    value: tipoJuicio.id,
                    label: corregirCodificacion(
                      tipoJuicio.description.toUpperCase()
                    ),
                    nombre: corregirCodificacion(
                      tipoJuicio.description.toUpperCase()
                    ),
                  }))}
                  placeholder="Tipo de juicio"
                  register={register}
                  errors={errors}
                  validation="Es obligatorio cargar un tipo de juicio"
                  setValue={setValue}
                  control={control}
                  noOptionsMessage="No hay un tipo de juicio coincidente"
                  isMulti={false}
                  onchange={(e) => handleChange("tipoJuicio", e)}
                />
              )}
            </Card>
          </div>
          <div className="w-full sm:w-1/2">
            <Card title="Rubro">
              {!isEditing ? (
                detail.rubro.length > 0 ? (
                  detail.rubro.map((rub) => (
                    <p className="pl-2" key={rub.nombre}>
                      {rub.nombre}
                    </p>
                  ))
                ) : (
                  <p>No se seleccionaron rubros</p>
                )
              ) : (
                <Input
                  key="rubro"
                  name="rubro"
                  label="Rubro"
                  type="select"
                  options={rubros?.map((rubro) => ({
                    ...rubro,
                    value: rubro.id,
                    label: corregirCodificacion(rubro.rubro.toUpperCase()),
                    nombre: corregirCodificacion(rubro.rubro.toUpperCase()),
                  }))}
                  placeholder="Rubro"
                  register={register}
                  errors={errors}
                  validation="Es obligatorio cargar un rubro"
                  setValue={setValue}
                  control={control}
                  noOptionsMessage="No hay un rubro coincidente"
                  isMulti={true}
                  onchange={(e) => handleChange("rubro", e)}
                />
              )}
            </Card>
          </div>
        </div>
        {(detail.punitivo || detail.moral || detail.patrimonial) && (
          <>
            <Card title={`Valores asociados en ${detail.divisa.codigo}`}>
              {isEditing && (
                <div className="w-full sm:w-2/4">
                  <Input
                    key="divisa"
                    name="divisa"
                    label="Seleccione la divisa a utilizar"
                    type="select"
                    options={divisas.map((div) => ({
                      value: div.codigoDivisa,
                      id: div.id,
                      label: div.nombreDivisa,
                    }))}
                    placeholder="Seleccione una divisa"
                    register={register}
                    errors={errors}
                    validation="Es obligatorio cargar una divisa"
                    setValue={setValue}
                    control={control}
                    noOptionsMessage="No hay una divisa coincidente"
                    isMulti={false}
                    onchange={(e) => handleChange("divisa", e)}
                  />
                </div>
              )}
              {detail.punitivo &&
                (!isEditing ? (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Punitivo: {detail.punitivo}
                  </p>
                ) : (
                  <span>
                    Daño Punitivo:
                    <input
                      name="punitivo"
                      type="number"
                      value={editableDetail.punitivo}
                      onChange={(e) => handleChange("punitivo", e.target.value)}
                      className="w-32 ml-2"
                    />
                  </span>
                ))}
              {detail.moral &&
                (!isEditing ? (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Moral: {detail.moral}
                  </p>
                ) : (
                  <span>
                    Daño Moral:
                    <input
                      name="moral"
                      type="number"
                      value={editableDetail.moral}
                      onChange={(e) => handleChange("moral", e.target.value)}
                      className="w-32 ml-2"
                    />
                  </span>
                ))}
              {detail.patrimonial &&
                (!isEditing ? (
                  <p className="pl-2 gap-x-1 flex items-center">
                    <MdScatterPlot />
                    Daño Patrimonial: {detail.patrimonial}
                  </p>
                ) : (
                  <span>
                    Daño Patrimonial
                    <input
                      name="patrimonial"
                      type="number"
                      value={editableDetail.patrimonial}
                      onChange={(e) =>
                        handleChange("patrimonial", e.target.value)
                      }
                      className="w-32 ml-2"
                    />
                  </span>
                ))}
            </Card>
          </>
        )}
        {
          <div className="flex flex-col flex-wrap gap-y-1">
            <Card title="Etiquetas relacionadas">
              {!isEditing ? (
                <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
                  {detail.etiquetas.length > 0 ? (
                    detail.etiquetas.map((tag) => (
                      <span
                        key={tag.nombre}
                        className="px-2 py-1 rounded-md bg-light_grey capitalize"
                      >
                        {tag.nombre}
                      </span>
                    ))
                  ) : (
                    <p>No se seleccionaron etiquetas</p>
                  )}
                </div>
              ) : (
                <Input
                  key="etiquetas"
                  name="etiquetas"
                  label="Etiquetas"
                  type="select"
                  options={etiquetas.map((etiqueta) => ({
                    ...etiqueta,
                    value: etiqueta.id,
                    label: corregirCodificacion(etiqueta.description),
                    nombre: corregirCodificacion(etiqueta.description),
                  }))}
                  placeholder="Seleccione una etiqueta"
                  register={register}
                  errors={errors}
                  validation="Es obligatorio cargar una etiqueta"
                  setValue={setValue}
                  control={control}
                  noOptionsMessage="No hay una etiqueta coincidente"
                  isMulti={true}
                  onchange={(e) => handleChange("etiquetas", e)}
                />
              )}
            </Card>
          </div>
        }
        {
          <Card title="Archivos adjuntos">
            <div className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-2">
              {!isEditing ? (
                detail.files.length > 0 ? (
                  detail.files.map((file, index) => {
                    return (
                      <button
                        key={file.file}
                        className="px-4 py-2 rounded-sm bg-verdictsPrimary"
                        onClick={() => openModal(detail.files[index])}
                      >
                        Ver Documento Adjunto {index + 1}
                      </button>
                    );
                  })
                ) : (
                  <p>No se subió ningún archivo adjunto</p>
                )
              ) : (
                <Input
                  label="Subir nuevo documento"
                  name="file"
                  type="file"
                  placeholder="Archivo del fallo"
                  register={register}
                  errors={errors}
                  onchange={(e) => handleChange("file", e)}
                />
              )}
            </div>
          </Card>
        }

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
  );
};

export default DetailContent;
