import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosFallos } from "@Api/index.js";
import { Input } from "@Components";
import corregirCodificacion from "@Utils/corregirCodificacion";
import MySwal from "@Utils/swal";
import formUploaded from "@Assets/formUploaded.png";
import formErrorUpload from "@Assets/formErrorUpload.png";

function UploadForm() {
  const [loading, setLoading] = useState(true);
  // crear estados para cada select a rellenar en el formulario
  const [empresasState, setEmpresasState] = useState([]);
  const [tiposJuicioState, setTiposJuicioState] = useState([]);
  const [causasState, setCausasState] = useState([]);
  const [rubrosState, setRubrosState] = useState([]);
  const [provinciasState, setProvinciasState] = useState([]);
  const [etiquetasState, setEtiquetasState] = useState([]);

  //crear estados para cada select dependiente
  const [ciudadesState, setCiudadesState] = useState([]);
  const [tribunalesState, setTribunalesState] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      const [
        empresasResponse,
        tiposJuicioResponse,
        causasResponse,
        rubrosResponse,
        provinciasResponse,
        etiquetasResponse,
      ] = await Promise.all([
        axiosFallos.get("/api/datos/empresas"),
        axiosFallos.get("/api/datos/tipojuicio"),
        axiosFallos.get("/api/datos/reclamos"),
        axiosFallos.get("/api/datos/rubros"),
        axiosFallos.get("/api/datos/provincias"),
        axiosFallos.get("/api/datos/etiquetas"),
      ]);
      setEmpresasState(empresasResponse.data);
      setTiposJuicioState(tiposJuicioResponse.data);
      setCausasState(causasResponse.data);
      setRubrosState(rubrosResponse.data);
      setProvinciasState(provinciasResponse.data);
      setEtiquetasState(etiquetasResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fields = [
    {
      name: "actor",
      label: "Actor",
      type: "text",
      placeholder: "Actor",
      register: register,
      errors: errors,
      validation: "Es obligatorio cargar un actor",
    },
    {
      name: "demandado",
      label: "Demandado",
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
  ];

  const provinciaSelected = watch("tribunalProvincia");
  const ciudadSelected = watch("tribunalCiudad");

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
      const response = await axiosFallos.post("/api/fallo", formData);
      MySwal.fire({
        html: `<div class="flex flex-col gap-y-2">
        <img src=${formUploaded} alt="imagen de subida exitosa" />
        <span class="text-lg font-semibold text-title">El fallo fue cargado con éxito</span>
        </div>`,
        confirmButtonText: "Aceptar",
      });
      reset();
    } catch (error) {
      console.error(error);
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

  if (!loading) {
    return (
      <div className="p-4 h-full w-full">
        <form
          className="flex flex-col gap-y-2 w-full px-4 md:w-1/2 md:mx-auto"
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
              />
            ))}
          </div>
          <span className="text-xl font-semibold text-title mt-3">
            Información del tribunal
          </span>
          <Input
            type="select"
            name="tribunalProvincia"
            label="Provincia"
            validation="Debe seleccionar una provincia"
            placeholder="Seleccione una provincia"
            noOptionsMessage="No hay una provincia coincidente"
            options={provinciasState.map((provincia) => ({
              ...provincia,
              value: provincia.id,
              label: corregirCodificacion(provincia.nombre),
            }))}
            onchange={handleChangeProvincia}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />

          <Input
            type="select"
            name="tribunalCiudad"
            label="Ciudad"
            validation="Debe seleccionar una ciudad"
            placeholder="Seleccione una ciudad"
            noOptionsMessage="No hay una ciudad coincidente"
            options={ciudadesState.map((ciudad) => ({
              ...ciudad,
              value: ciudad.id,
              label: corregirCodificacion(ciudad.nombre),
            }))}
            onchange={handleChangeCiudad}
            register={register}
            errors={errors}
            disabled={!provinciaSelected}
            setValue={setValue}
            control={control}
          />
          <Input
            name="idTribunal"
            type="select"
            label="Tribunal"
            validation="Debe seleccionar un tribunal"
            placeholder="Seleccione un tribunal"
            noOptionsMessage="No hay un tribunal coincidente"
            options={tribunalesState.map((tribunal) => ({
              ...tribunal,
              value: tribunal.id,
              label: corregirCodificacion(tribunal.nombre),
            }))}
            register={register}
            errors={errors}
            disabled={!ciudadSelected}
            setValue={setValue}
            control={control}
          />
          <span className="text-xl font-semibold text-title mt-3">Montos</span>
          <Input
            label="Daño Punitivo"
            name="punitivo"
            type="number"
            placeholder="Daño Punitivo"
            register={register}
            errors={errors}
          />
          <Input
            label="Daño Moral"
            name="moral"
            type="number"
            placeholder="Daño Moral"
            register={register}
            errors={errors}
          />
          <Input
            label="Patrimonial"
            name="patrimonial"
            type="number"
            placeholder="Monto Patrimonial"
            register={register}
            errors={errors}
          />
          <span className="text-xl font-semibold text-title mt-3">
            Resumen del caso
          </span>
          <Input
            type="select"
            name="etiquetas"
            label="Etiquetas"
            validation="Debe seleccionar una etiqueta"
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
          />
          <div className="flex flex-col gap-y-1">
            <label htmlFor="resumen">Resumen</label>
            <textarea
              className={`border border-[#687073] pl-1 py-2.5 rounded-md outline-none`}
              {...register("resumen", {
                required: true,
                maxLength: 300,
              })}
              name="resumen"
            ></textarea>

            {errors["resumen"] && errors["resumen"].type === "required" && (
              <p className="text-sm text-red-500">
                Debe completar un resumen del fallo
              </p>
            )}
            {errors["resumen"] && errors["resumen"].type === "maxLength" && (
              <p className="text-sm text-red-500">
                Máximo de caracteres alcanzado: 300
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
