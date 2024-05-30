import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { axiosFallos } from "@Api/index.js";
import { Input } from "@Components";
import corregirCodificacion from "@Utils/corregirCodificacion";
import MySwal from "@Utils/swal";
import formUploaded from "@Assets/formUploaded.png";
import formErrorUpload from "@Assets/formErrorUpload.png";

function UploadForm() {
  const [loading, setLoading] = useState(true);

  const [empresasState, setEmpresasState] = useState([]);
  const [tiposJuicioState, setTiposJuicioState] = useState([]);
  const [causasState, setCausasState] = useState([]);
  const [rubrosState, setRubrosState] = useState([]);
  const [provinciasState, setProvinciasState] = useState([]);
  const [etiquetasState, setEtiquetasState] = useState([]);
  const [ciudadesState, setCiudadesState] = useState([]);
  const [tribunalesState, setTribunalesState] = useState([]);
  const [divisasState, setDivisasState] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const provinciaSelected = watch("tribunalProvincia");
  const ciudadSelected = watch("tribunalCiudad");
  const empresasSelected = watch("demandado") || [];
  const etiquetaSelected = watch("etiquetas") || [];
  const causasSelected = watch("causas") || [];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!watch("firmActor")) setValue("actor", null);
    if (watch("personDemandado")) setValue("demandado", null);
  }, [watch("firmActor"), watch("personDemandado")]);

  const Toast = MySwal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

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
      setEmpresasState(empresasResponse.data);
      setTiposJuicioState(tiposJuicioResponse.data);
      setCausasState(causasResponse.data);
      setRubrosState(rubrosResponse.data);
      setProvinciasState(provinciasResponse.data);
      setEtiquetasState(etiquetasResponse.data);
      setDivisasState(divisasResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewCompany = async (newCompany) => {
    try {
      const response = await axiosFallos.post(
        "/api/datos/empresas",
        newCompany
      );
      const newEmpresa = response.data;
      setEmpresasState([...empresasState, newEmpresa]);
      setValue("demandado", [
        ...empresasSelected,
        {
          value: newEmpresa.id,
          label: corregirCodificacion(newEmpresa.razon_social),
        },
      ]);

      Toast.fire({
        icon: "success",
        title: "Empresa agregada exitosamente",
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        text: "Error al agregar la nueva empresa",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const addNewCausaReclamo = async (newCausaReclamo) => {
    try {
      const response = await axiosFallos.post(
        "api/datos/reclamos",
        newCausaReclamo
      );
      const newCausa = response.data;
      setCausasState([...causasState, newCausa]);
      setValue("causas", [
        ...causasSelected,
        {
          value: newCausa.id,
          label: corregirCodificacion(newCausa.description.toUpperCase()),
        },
      ]);

      Toast.fire({
        icon: "success",
        title: "Causa de reclamo agregada exitosamente",
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        text: "Error al agregar la nueva causa de reclamo",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const addNewEtiquetas = async (newEtiqueta) => {
    try {
      const response = await axiosFallos.post(
        "/api/datos/etiquetas",
        newEtiqueta
      );
      const newEtiquetaResponse = response.data;
      setEtiquetasState([...etiquetasState, newEtiquetaResponse]);
      setValue("etiquetas", [
        ...etiquetaSelected,
        {
          value: newEtiquetaResponse.id,
          label: corregirCodificacion(newEtiquetaResponse.description),
        },
      ]);
      Toast.fire({
        icon: "success",
        title: "Etiqueta agregada exitosamente",
      });
    } catch (error) {
      MySwal.fire({
        text: "Error al agregar la nueva etiqueta",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleChangeProvincia = async (selectedOption) => {
    try {
      setValue("tribunalCiudad", null);
      setCiudadesState([]);
      const response = await axiosFallos.get(
        `/api/datos/ciudades?idProvincia=${selectedOption.value}`
      );
      setCiudadesState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeCiudad = async (selectedOption) => {
    try {
      setValue("idTribunal", null);
      setTribunalesState([]);
      const response = await axiosFallos.get(
        `/api/datos/juzgados?idCiudad=${selectedOption.value}`
      );
      setTribunalesState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async (data) => {
    setLoading(true);
    const { tribunalCiudad, tribunalProvincia, ...newData } = data;
    const formData = new FormData();
    formData.append("file", data.file[0]);
    Object.keys(newData).forEach((key) => {
      if (key !== "file") {
        if (Array.isArray(newData[key])) {
          newData[key].forEach((value) => {
            formData.append(key, parseInt(value.value));
          });
        } else if (typeof newData[key] === "object" && newData[key].value) {
          formData.append(key, parseInt(newData[key].value));
        } else {
          formData.append(key, newData[key]);
        }
      }
    });
    try {
      await axiosFallos.post("/api/fallo", formData);
      MySwal.fire({
        html: `<div class="flex flex-col gap-y-2">
        <img src=${formUploaded} alt="imagen de subida exitosa" />
        <span class="text-lg font-semibold text-title">El fallo fue cargado con éxito</span>
        </div>`,
        confirmButtonText: "Aceptar",
      });
      reset();
    } catch (error) {
      MySwal.fire({
        html: `<div class="flex flex-col gap-y-2">
        <img src=${formErrorUpload} alt="imagen de subida fallida" />
        <span class="text-lg font-semibold text-title">Hubo un error al cargar el fallo. Intente nuevamente</span>
        </div>`,
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = useMemo(
    () => [
      {
        name: "firmActor",
        label: "Persona jurídica como actor",
        type: "checkbox",
        register: register,
        placeholder: "Seleccione tipo de actor",
        errors: errors,
      },
      !watch("firmActor")
        ? {
            name: "actor",
            label: "Persona como actor",
            type: "text",
            placeholder: "Persona como actor",
            register: register,
            errors: errors,
            validation: "Es obligatorio cargar un actor",
          }
        : {
            name: "actor",
            label: "Empresa como actor",
            type: "select",
            placeholder: "Seleccione un actor",
            register: register,
            options: empresasState?.map((empresa) => ({
              ...empresa,
              value: empresa.id,
              label: corregirCodificacion(empresa.razon_social),
            })),
            setValue: setValue,
            errors: errors,
            control: control,
            noOptionsMessage: "No hay un demandado coincidente",
            isMulti: true,
            validation: "Es obligatorio cargar un actor",
            createTable: true,
            handleClickCreateTable: () => {
              MySwal.fire({
                title: "Agregar nueva empresa",
                html: (
                  <div className="flex flex-col gap-y-2 items-start">
                    <div className="w-full flex justify-between items-center">
                      <label>Razón Social:</label>
                      <input
                        className="rounded-md"
                        type="text"
                        id="razon_social"
                      />
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <label>CUIT:</label>
                      <input className="rounded-md" type="number" id="cuit" />
                    </div>
                  </div>
                ),
                confirmButtonText: "Agregar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                  const razon_social =
                    document.getElementById("razon_social").value;
                  const cuit = document.getElementById("cuit").value;
                  if (!razon_social || !cuit) {
                    MySwal.showValidationMessage(
                      `Debe completar todos los campos para agregar una empresa`
                    );
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  addNewCompany({
                    razon_social: document.getElementById("razon_social").value,
                    cuit: document.getElementById("cuit").value,
                  });
                }
              });
            },
          },
      {
        name: "personDemandado",
        label: "Persona física como demandada",
        type: "checkbox",
        register: register,
        placeholder: "Seleccione tipo de demandado",
        errors: errors,
      },
      !watch("personDemandado")
        ? {
            name: "demandado",
            label: "Empresa demandada",
            type: "select",
            options: empresasState?.map((empresa) => ({
              ...empresa,
              value: empresa.id,
              label: corregirCodificacion(empresa.razon_social),
            })),
            placeholder: "Seleccione un demandado",
            register: register,
            errors: errors,
            validation: "Es obligatorio cargar un demandado",
            setValue: setValue,
            control: control,
            noOptionsMessage: "No hay un demandado coincidente",
            isMulti: true,
            createTable: true,
            handleClickCreateTable: () => {
              MySwal.fire({
                title: "Agregar nueva empresa",
                html: (
                  <div className="flex flex-col gap-y-2 items-start">
                    <div className="w-full flex justify-between items-center">
                      <label>Razón Social:</label>
                      <input
                        className="rounded-md"
                        type="text"
                        id="razon_social"
                      />
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <label>CUIT:</label>
                      <input className="rounded-md" type="number" id="cuit" />
                    </div>
                  </div>
                ),
                confirmButtonText: "Agregar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                  const razon_social =
                    document.getElementById("razon_social").value;
                  const cuit = document.getElementById("cuit").value;
                  if (!razon_social || !cuit) {
                    MySwal.showValidationMessage(
                      `Debe completar todos los campos para agregar una empresa`
                    );
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  addNewCompany({
                    razon_social: document.getElementById("razon_social").value,
                    cuit: document.getElementById("cuit").value,
                  });
                }
              });
            },
          }
        : {
            name: "demandado",
            label: "Persona demandada",
            type: "text",
            placeholder: "Persona demandada",
            register: register,
            errors: errors,
            validation: "Es obligatorio cargar un demandado",
          },
      {
        name: "tipoJuicio",
        label: "Tipo de juicio",
        type: "select",
        options: tiposJuicioState?.map((tipoJuicio) => ({
          ...tipoJuicio,
          value: tipoJuicio.id,
          label: corregirCodificacion(tipoJuicio.description.toUpperCase()),
        })),
        placeholder: "Tipo de juicio",
        register: register,
        errors: errors,
        validation: "Es obligatorio cargar un tipo de juicio",
        setValue: setValue,
        control: control,
        noOptionsMessage: "No hay un tipo de juicio coincidente",
      },
      {
        name: "causas",
        label: "Causas del reclamo",
        type: "select",
        options: causasState?.map((causa) => ({
          ...causa,
          value: causa.id,
          label: corregirCodificacion(causa.description.toUpperCase()),
        })),
        placeholder: "Causas del reclamo",
        register: register,
        errors: errors,
        validation: "Es obligatorio cargar una causa del reclamo",
        setValue: setValue,
        control: control,
        noOptionsMessage: "No hay una causa del reclamo coincidente",
        isMulti: true,
        createTable: true,
        handleClickCreateTable: () => {
          MySwal.fire({
            title: "Agregar nueva causa",
            html: (
              <div className="flex flex-col gap-y-2 items-start">
                <div className="w-full flex justify-between items-center">
                  <label>Causa de reclamo:</label>
                  <input
                    className="rounded-md"
                    type="text"
                    id="causa_reclamo"
                  />
                </div>
              </div>
            ),
            confirmButtonText: "Agregar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const causa = document.getElementById("causa_reclamo").value;
              if (!causa) {
                MySwal.showValidationMessage(
                  `Debe completar el campo para agregar una causa de reclamo`
                );
              }
            },
          }).then((result) => {
            if (result.isConfirmed) {
              addNewCausaReclamo({
                description: document.getElementById("causa_reclamo").value,
              });
            }
          });
        },
      },
      {
        name: "rubro",
        label: "Rubro",
        type: "select",
        options: rubrosState?.map((rubro) => ({
          ...rubro,
          value: rubro.id,
          label: corregirCodificacion(rubro.rubro.toUpperCase()),
        })),
        placeholder: "Rubro",
        register: register,
        errors: errors,
        validation: "Es obligatorio cargar un rubro",
        setValue: setValue,
        control: control,
        noOptionsMessage: "No hay un rubro coincidente",
        isMulti: true,
      },
      {
        name: "fecha",
        label: "Fecha",
        type: "date",
        placeholder: "Fecha",
        register: register,
        errors: errors,
        validation: "Es obligatorio cargar una fecha",
      },
    ],
    [
      empresasState,
      rubrosState,
      causasState,
      watch("firmActor"),
      watch("personDemandado"),
    ]
  );

  const courtFields = [
    {
      name: "tribunalProvincia",
      type: "select",
      label: "Provincia",
      placeholder: "Seleccione una provincia",
      noOptionsMessage: "No hay una provincia coincidente",
      options: provinciasState.map((provincia) => ({
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
      name: "tribunalCiudad",
      type: "select",
      label: "Ciudad",

      placeholder: "Seleccione una ciudad",
      noOptionsMessage: "No hay una ciudad coincidente",
      options: ciudadesState.map((ciudad) => ({
        ...ciudad,
        value: ciudad.id,
        label: corregirCodificacion(ciudad.nombre),
      })),
      onchange: handleChangeCiudad,
      register: register,
      errors: errors,
      disabled: !provinciaSelected,
      setValue: setValue,
      control: control,
    },
    {
      name: "idTribunal",
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

  const moneyFields = [
    {
      name: "punitivo",
      label: "Daño Punitivo",
      type: "number",
      placeholder: "Daño Punitivo",
      register: register,
      errors: errors,
    },
    {
      name: "moral",
      label: "Daño Moral",
      type: "number",
      placeholder: "Daño Moral",
      register: register,
      errors: errors,
    },
  ];

  if (!loading) {
    return (
      <div className="p-4 h-full w-full bg-gray-100">
        <form
          className="flex flex-col gap-y-2 w-full px-4 md:w-2/3 md:mx-auto xl:w-1/2 bg-white drop-shadow-xl rounded-md p-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <span className="md:text-4xl md:text-left text-3xl text-center font-bold text-title w-full md:mx-auto uppercase">
            Carga de fallo judicial
          </span>
          <Input
            label="Subir documento del fallo judicial"
            name="file"
            type="file"
            placeholder="Archivo del fallo"
            register={register}
            errors={errors}
          />
          <span className="text-xl font-semibold text-title mt-3">
            Voces definidas del fallo
          </span>
          <div className="flex flex-col gap-y-2 text-left">
            {fields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                options={field.options}
                placeholder={field.placeholder}
                register={field.register}
                errors={field.errors}
                validation={field.validation}
                setValue={field.setValue}
                control={field.control}
                noOptionsMessage={field.noOptionsMessage}
                isMulti={field.isMulti ? field.isMulti : false}
                createTable={field.createTable ? field.createTable : false}
                handleClickCreateTable={
                  field.handleClickCreateTable
                    ? field.handleClickCreateTable
                    : null
                }
              />
            ))}
          </div>
          <span className="text-xl font-semibold text-title mt-3">
            Información del tribunal
          </span>
          {courtFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              options={field.options}
              placeholder={field.placeholder}
              register={field.register}
              errors={field.errors}
              validation={field.validation}
              setValue={field.setValue}
              control={field.control}
              noOptionsMessage={field.noOptionsMessage}
              isMulti={field.isMulti ? field.isMulti : false}
              createTable={field.createTable ? field.createTable : false}
              handleClickCreateTable={
                field.handleClickCreateTable
                  ? field.handleClickCreateTable
                  : null
              }
              onchange={field.onchange}
              disabled={field.disabled}
            />
          ))}
          <span className="text-xl font-semibold text-title mt-3">Montos</span>
          {moneyFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              setValue={field.setValue}
              options={field.options?.map((o) => ({
                value: o.id,
                label: o.nombreDivisa,
                nombre: o.codigoDivisa,
              }))}
              placeholder={field.placeholder}
              register={field.register}
              errors={field.errors}
              control={field.control}
            />
          ))}
          <div className="flex flex-row gap-x-3">
            <Input
              key={"patrimonial"}
              name={"patrimonial"}
              label={"Patrimonial"}
              type={"number"}
              setValue={setValue}
              placeholder={"Daño Patrimonial"}
              register={register}
              errors={errors}
            />
            <Input
              key={"divisa"}
              name={"divisa"}
              label={"Seleccione la divisa a utilizar"}
              type={"select"}
              setValue={setValue}
              options={divisasState.map((o) => ({
                value: o.id,
                label: o.nombreDivisa,
                nombre: o.codigoDivisa,
              }))}
              placeholder={"Divisa"}
              register={register}
              errors={errors}
              control={control}
            />
          </div>
          <span className="text-xl font-semibold text-title mt-3">
            Resumen del caso
          </span>
          <Input
            type="select"
            name="etiquetas"
            label="Etiquetas"
            validation="Es obligatorio cargar una etiqueta"
            placeholder="Seleccione una etiqueta"
            noOptionsMessage="No hay una etiqueta coincidente"
            options={etiquetasState.map((etiqueta) => ({
              ...etiqueta,
              value: etiqueta.id,
              label: corregirCodificacion(etiqueta.description),
            }))}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            isMulti={true}
            createTable={true}
            handleClickCreateTable={() => {
              MySwal.fire({
                title: "Agregar nueva etiqueta",
                html: (
                  <div className="flex flex-col gap-y-2 items-start">
                    <div className="w-full flex justify-between items-center">
                      <label>Etiqueta:</label>
                      <input className="rounded-md" type="text" id="etiqueta" />
                    </div>
                  </div>
                ),
                confirmButtonText: "Agregar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                  const etiqueta = document.getElementById("etiqueta").value;
                  if (!etiqueta) {
                    MySwal.showValidationMessage(
                      `Debe completa el campo para agregar una etiqueta`
                    );
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  addNewEtiquetas({
                    description: document.getElementById("etiqueta").value,
                  });
                }
              });
            }}
          />
          <div className="flex flex-col gap-y-1">
            <label htmlFor="resumen">Resumen</label>
            <textarea
              className={`border border-[#687073] pl-1 py-2.5 rounded-md outline-none`}
              {...register("resumen", {
                required: true,
                maxLength: 600,
              })}
              name="resumen"
            ></textarea>

            {errors["resumen"] && errors["resumen"].type === "required" && (
              <p className="text-sm text-red-500">
                Es obligatorio completar un resumen del fallo
              </p>
            )}
            {errors["resumen"] && errors["resumen"].type === "maxLength" && (
              <p className="text-sm text-red-500">
                Máximo de caracteres alcanzado: 600
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-24 h-12 bg-general  p-2.5 my-5 text-white font-semibold rounded-md mx-auto hover:bg-hoverGeneral"
          >
            {"CARGAR"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-b-2 border-navbar"></div>
      <p className="ml-3">Cargando...</p>
    </div>
  );
}

export default UploadForm;
