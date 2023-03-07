import React from "react";
import TitlePage from "@Components/TitlePage";
import { useForm } from "react-hook-form";
import Input from "@Components/Input";
import { BsUpload } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";

const UploadLegal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fieldsDefinidos = [
    { label: "Actor/es", name: "actor", type: "text" },
    { label: "Demandado/s", name: "demandado", type: "text" },
  ];
  const fieldsSelections = [
    {
      label: "Tipo de juicio",
      name: "tipo_juicio",
      type: "select",
      options: [
        { value: 1, label: "Civil" },
        { value: 2, label: "Penal" },
        { value: 3, label: "Laboral" },
      ],
    },
    {
      label: "Causas del reclamo",
      name: "causa_reclamo",
      type: "select",
      options: [
        { value: 1, label: "Causa 1" },
        { value: 2, label: "Causa 2" },
        { value: 3, label: "Causa 3" },
      ],
    },
    {
      label: "Rubro",
      name: "rubro",
      type: "select",
      options: [
        { value: 1, label: "rubro 1" },
        { value: 2, label: "rubro 2" },
        { value: 3, label: "rubro 3" },
      ],
    },
    {
      label: "Empresa",
      name: "empresa",
      type: "select",
      options: [
        { value: 1, label: "Empresa 1" },
        { value: 2, label: "Empresa 2" },
        { value: 3, label: "Empresa 3" },
      ],
    },
    {
      label: "Tribunal",
      name: "tribunal",
      type: "select",
      options: [
        { value: 1, label: "tribunal 1" },
        { value: 2, label: "tribunal 2" },
        { value: 3, label: "tribunal 3" },
      ],
    },
  ];
  const fieldsMontos = [
    { label: "Daño punitivo", name: "daño_punitivo", type: "text" },
    { label: "Daño Moral", name: "daño_moral", type: "text" },
    { label: "Patrimonial", name: "patrimonial", type: "text" },
  ];

  // onSubmit
  const submitData = (data) => {
    console.log("submit");
    console.log(data);
  };

  return (
    <div className="h-full w-full">
      <TitlePage title={`Subir fallo`} icon={<BsUpload />} sub />
      <div className="py-5">
        <span className="text-4xl font-bold text-title flex justify-center my-3">
          Formulario de carga de fallo judicial
        </span>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-y-2 mx-auto w-1/2"
        >
          <Input
            type="file"
            register={register}
            name="fallo"
            label="Subir archivo (pdf del fallo *)"
            errors={errors}
          />
          <span className="text-xl font-semibold text-title mt-3">
            Cargar voces DEFINIDAS del fallo:
          </span>
          {fieldsDefinidos.map((field) => (
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              register={register}
              errors={errors}
            />
          ))}
          {fieldsSelections.map((s) => (
            <Input
              key={s.name}
              type={s.type}
              name={s.name}
              options={s.options}
              label={s.label}
              register={register}
              errors={errors}
            />
          ))}
          <span className="text-xl font-semibold text-title mt-3">
            Datos del Tribunal
          </span>
          {fieldsMontos.map((item) => (
            <Input
              key={item.name}
              name={item.name}
              label={item.label}
              register={register}
              errors={errors}
              type={"text"}
            />
          ))}
          <div className="flex flex-col">
            <label>Resumen del caso</label>
            <textarea
              className={`border border-[#687073] pl-1 py-2.5 rounded-md outline-none ${
                errors["summary"] && "border-red-500"
              }`}
              {...register("summary", {
                required: true,
                maxLength: 100,
              })}
            ></textarea>

            {errors["summary"] && errors["summary"].type === "required" && (
              <p className="text-sm text-red-500">
                Debe completar el campo para continuar
              </p>
            )}
            {errors["summary"] && errors["summary"].type === "maxLength" && (
              <p className="text-sm text-red-500">
                Máximo de caracteres alcanzado: 100
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-24 h-12 bg-button flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md mx-auto hover:bg-buttonHover"
          >
            {"Cargar"} <AiOutlineUpload />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadLegal;
