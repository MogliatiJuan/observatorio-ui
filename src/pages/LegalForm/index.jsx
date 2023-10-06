import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Input } from "@Components";

function UploadForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

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
    // {
    //   name: "demandado",
    //   label: "Demandado",
    //   type: "select",
    //   options: [
    //     { value: 1, label: "Juzgado1" },
    //     { value: 2, label: "Juzgado2" },
    //     { value: 3, label: "Juzgado3" },
    //   ],
    //   placeholder: "Demandado",
    //   register: register,
    //   errors: errors,
    //   validation: "Es obligatorio cargar un demandado",
    // },
    // {
    //   name: "tipoJuicio",
    //   label: "Tipo de juicio",
    //   type: "select",
    //   options: [
    //     { value: 1, label: "Sumario" },
    //     { value: 2, label: "Amparo" },
    //     { value: 3, label: "Penal" },
    //   ],
    //   placeholder: "Tipo de juicio",
    //   register: register,
    //   errors: errors,
    //   validation: "Es obligatorio cargar un tipo de juicio",
    // },
    // {
    //   name: "causasdelreclamo",
    //   label: "Causas del reclamo",
    //   type: "select",
    //   options: [
    //     { value: 1, label: "Causa1" },
    //     { value: 2, label: "Causa2" },
    //     { value: 3, label: "Causa3" },
    //   ],
    //   placeholder: "Causas del reclamo",
    //   register: register,
    //   errors: errors,
    //   validation: "Es obligatorio cargar una causa del reclamo",
    // },
    // {
    //   name: "rubro",
    //   label: "Rubro",
    //   type: "select",
    //   options: [
    //     { value: 1, label: "Rubro1" },
    //     { value: 2, label: "Rubro2" },
    //     { value: 3, label: "Rubro3" },
    //   ],
    //   placeholder: "Rubro",
    //   register: register,
    //   errors: errors,
    //   validation: "Es obligatorio cargar un rubro",

    // },
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

  const provincias = [
    { value: 1, label: "Buenos Aires" },
    { value: 2, label: "Cordoba" },
  ];
  const departamentos = [
    {
      value: 1,
      label: "Azul",
      id_provincia: 1,
    },
    {
      value: 2,
      label: "BahÃ­a Blanca",
      id_provincia: 1,
    },
    {
      value: 3,
      label: "Dolores",
      id_provincia: 1,
    },
    {
      value: 4,
      label: "JunÃ­n",
      id_provincia: 1,
    },
    {
      value: 5,
      label: "La Matanza",
      id_provincia: 1,
    },
    {
      value: 6,
      label: "La Plata",
      id_provincia: 1,
    },
  ];

  const ciudades = [
    {
      id: 1,
      nombre: "Abasto",
      idprovincia: 1,
    },
    {
      id: 2,
      nombre: "Abbott",
      idprovincia: 1,
    },
    {
      id: 3,
      nombre: "Acassuso",
      idprovincia: 1,
    },
    {
      id: 4,
      nombre: "Acevedo",
      idprovincia: 1,
    },
    {
      id: 5,
      nombre: "Adolfo Gonzales Chaves (Est. Chaves)",
      idprovincia: 1,
    },
    {
      id: 6,
      nombre: "Adrogue",
      idprovincia: 1,
    },
  ].map((ciudad) => ({
    label: ciudad.nombre,
    value: ciudad.idprovincia,
  }));

  const tribunalesForIdCiudad = [
    {
      id: 2,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 1",
      id_departamento: 33,
      id_ciudad: 676,
      juez: " ",
      estado: 111,
    },
    {
      id: 149,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 1",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 150,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 2",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 151,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 3",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 152,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 4",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 153,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 5",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 154,
      id_tipo: 1,
      nombre: "Juzgado Civil y Comercial N° 6",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 311,
      id_tipo: 6,
      nombre: "UFI N° 1",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 312,
      id_tipo: 6,
      nombre: "UFI N° 2",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
    {
      id: 313,
      id_tipo: 6,
      nombre: "UFI N° 3",
      id_departamento: 33,
      id_ciudad: 676,
      juez: "",
      estado: 1,
    },
  ].map((tribunal) => ({
    value: tribunal.id,
    label: tribunal.nombre,
  }));

  const etiquetas = [
    { value: 1, label: "Etiqueta1" },
    { value: 2, label: "Etiqueta2" },
    { value: 3, label: "Etiqueta3" },
    { value: 4, label: "Etiqueta4" },
  ];

  const provinciaSelected = watch("provincia");
  const departamentoSelected = watch("departamento");
  const ciudadSelected = watch("ciudad");

  return (
    <div className="p-4 h-full w-full">
      <form
        className="flex flex-col gap-y-2 w-full px-4 md:w-1/2 md:mx-auto"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}>
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
          options={provincias}
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
        />
        <Input
          type="select"
          name="tribunalDepartamento"
          label="Departamento"
          validation="Debe seleccionar un departamento"
          placeholder="Seleccione un departamento"
          noOptionsMessage="No hay un departamento coincidente"
          options={departamentos}
          register={register}
          errors={errors}
          disabled={!provinciaSelected}
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
          options={ciudades}
          register={register}
          errors={errors}
          disabled={!departamentoSelected}
          setValue={setValue}
          control={control}
        />
        <Input
          name="tribunal"
          type="select"
          label="Tribunal"
          validation="Debe seleccionar un tribunal"
          placeholder="Seleccione un tribunal"
          noOptionsMessage="No hay un tribunal coincidente"
          options={tribunalesForIdCiudad}
          register={register}
          errors={errors}
          disabled={!ciudadSelected}
          setValue={setValue}
          control={control}
        />

        <span className="text-xl font-semibold text-title mt-3">Montos</span>
        <Input
          label="Daño Punitivo"
          name="dañoPunitivo"
          type="number"
          placeholder="Daño Punitivo"
          register={register}
          errors={errors}
        />
        <Input
          label="Daño Moral"
          name="dañoMoral"
          type="number"
          placeholder="Daño Moral"
          register={register}
          errors={errors}
        />
        <Input
          label="Patrimonial"
          name="montoPatrimonial"
          type="number"
          placeholder="Monto Patrimonial"
          register={register}
          errors={errors}
        />
        <span className="text-xl font-semibold text-title mt-3">
          Resumen del caso
        </span>
        <div className="flex flex-col gap-y-1 text-left cursor-pointer">
          <label htmlFor={"etiquetas"}>Etiquetas relacionadas al fallo</label>
          <select
            {...register("etiquetas", { required: "Seleccione etiquetas" })}
            className={`border border-[#687073] pl-1 py-2 rounded outline-none cursor-pointer`}>
            <option value="" selected disabled>
              Seleccione una opción
            </option>
            {etiquetas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors["etiquetas"] && (
            <p className="text-sm text-red-500">
              {errors["etiquetas"].message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="summary">Resumen</label>
          <textarea
            className={`border border-[#687073] pl-1 py-2.5 rounded-md outline-none`}
            {...register("summary", {
              required: true,
              maxLength: 300,
            })}
            name="summary"></textarea>

          {errors["summary"] && errors["summary"].type === "required" && (
            <p className="text-sm text-red-500">
              Debe completar un resumen del fallo
            </p>
          )}
          {errors["summary"] && errors["summary"].type === "maxLength" && (
            <p className="text-sm text-red-500">
              Máximo de caracteres alcanzado: 300
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-24 h-12 bg-button  p-2.5 my-5 text-white font-semibold rounded-md mx-auto hover:bg-buttonHover">
          {"CARGAR"}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
