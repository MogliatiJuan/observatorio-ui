import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@Components/Input";
import { AiOutlineUpload } from "react-icons/ai";
import companies from "@Assets/mocks/companies.json";
import trials from "@Assets/mocks/typeOfTrial.json";
import rubros from "@Assets/mocks/rubros.json";
import tags from "@Assets/mocks/tags.json";
import court from "@Assets/mocks/courts.json";
import claims from "@Assets/mocks/claims.json";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const UploadLegal = () => {
  const [empresaValue, setEmpresaValue] = useState([]);
  const [resetSelectKey, setResetSelectKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ defaultValues: {} });
  const fieldsDefinidos = [
    {
      label: "Actor",
      name: "agent",
      type: "text",
      validation: "Complete Actor",
    },
  ];
  const fieldMontos = [
    {
      label: "Daño punitivo",
      name: "punitive_damage",
      type: "number",
      validation: "Complete daño punitivo",
    },
    {
      label: "Daño moral",
      name: "moral_damage",
      type: "number",
      validation: "Complete daño moral",
    },
    {
      label: "Patrimonial",
      name: "patrimonial",
      type: "number",
      validation: "Complete monto patrimonial",
    },
  ];

  const submitData = (data) => {
    const formData = new FormData();
    formData.append("fallo", data.sentence[0]);
    formData.append("actor", data.agent);
    formData.append("demandado", data.defendant);
    formData.append("tipo_juicio", data.typeOf_trials);
    formData.append("causas", data.claims);
    formData.append("rubro", data.sector);
    formData.append("id_juzgado", data.courthouse);
    formData.append("fecha_fallo", data.dateOf_sentences);
    formData.append("faño_punitivo", data.punitive_damage);
    formData.append("daño_moral", data.moral_damage);
    formData.append("patrimonial", data.patrimonial);
    formData.append("etiquetas", data.tags);
    formData.append("resumen", data.summary);
    console.log([...formData]);
    reset();
    setEmpresaValue([]);
    setResetSelectKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="h-full w-full">
      <div className="py-2 mt-5">
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-y-2 w-full px-4 md:w-1/2 md:mx-auto"
          autoComplete="">
          <span className="md:text-4xl text-3xl font-bold text-title w-full md:mx-auto">
            Formulario de carga de fallo judicial
          </span>
          <Input
            type="file"
            register={register}
            name="sentence"
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
              validation={field.validation}
            />
          ))}
          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>Demandado</label>
            <Controller
              key={"empresa"}
              name={"defendant"}
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione o agregue una empresa",
              }}
              render={({ field: { onChange, name } }) => (
                <CreatableSelect
                  key={resetSelectKey}
                  className="border border-[#687073] rounded"
                  options={companies.map((item) => ({
                    value: parseInt(item.id),
                    label: `${item.razonSocial} - ${item.CUIT}`,
                  }))}
                  onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue, label: inputValue };
                    const newOptions = [...empresaValue, newOption];
                    setEmpresaValue(newOptions);
                    onChange(newOptions.map((option) => option.value));
                  }}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setEmpresaValue(selectedOptions);
                    onChange(selectedValues);
                  }}
                  value={empresaValue}
                  name={name}
                  formatCreateLabel={(inputValue) => (
                    <p>{`Añadir "${inputValue}"`}</p>
                  )}
                  placeholder="Seleccione una opción..."
                  isMulti
                  isClearable
                  pageSize={3}
                  noOptionsMessage={() => (
                    <p>No hay elementos coincidentes para su búsqueda</p>
                  )}
                />
              )}
            />
            {errors["defendant"] && (
              <p className="text-sm text-red-500">
                {errors["defendant"].message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>Tipo de juicio</label>
            <Controller
              name="typeOf_trials"
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione tipo de juicio",
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  key={resetSelectKey}
                  className="border border-[#687073] rounded"
                  options={trials.map((item) => ({
                    value: parseInt(item.id),
                    label: item.description.toUpperCase(),
                  }))}
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption
                      ? selectedOption.value
                      : null;
                    onChange(selectedValue);
                  }}
                  value={trials.find((item) => item.value === value)}
                  name={name}
                  defaultValue={[]}
                  placeholder="Seleccione una opción..."
                  noOptionsMessage={() => (
                    <p>No hay elementos coincidentes para su búsqueda</p>
                  )}
                />
              )}
            />
            {errors.typeOf_trials && (
              <p className="text-sm text-red-500">
                {errors.typeOf_trials.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>Causas del reclamo</label>
            <Controller
              name="claims"
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione causas del reclamo",
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  key={resetSelectKey}
                  className="border border-[#687073] rounded"
                  options={claims.map((item) => ({
                    value: parseInt(item.id),
                    label: item.description,
                  }))}
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption
                      ? selectedOption.value
                      : null;
                    onChange(selectedValue);
                  }}
                  value={claims.find((item) => item.value === value)}
                  name={name}
                  defaultValue={[]}
                  placeholder="Seleccione una opción..."
                  noOptionsMessage={() => (
                    <p>No hay elementos coincidentes para su búsqueda</p>
                  )}
                />
              )}
            />
            {errors.claims && (
              <p className="text-sm text-red-500">{errors.claims.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>Rubro</label>
            <Controller
              name="sector"
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione un rubro",
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  key={resetSelectKey}
                  className="border border-[#687073] rounded"
                  options={rubros.map((item) => ({
                    value: parseInt(item.id),
                    label: item.rubro,
                  }))}
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption
                      ? selectedOption.value
                      : null;
                    onChange(selectedValue);
                  }}
                  value={rubros.find((item) => item.value === value)}
                  name={name}
                  defaultValue={[]}
                  placeholder="Seleccione una opción..."
                  noOptionsMessage={() => (
                    <p>No hay elementos coincidentes para su búsqueda</p>
                  )}
                />
              )}
            />
            {errors.sector && (
              <p className="text-sm text-red-500">{errors.sector.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>Datos del tribunal</label>
            <Controller
              name="courthouse"
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione tribunal/juzgado",
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  key={resetSelectKey}
                  className="border border-[#687073] rounded"
                  options={court.map((item) => ({
                    value: item.id,
                    label: item.nombre,
                  }))}
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption
                      ? selectedOption.value
                      : null;
                    onChange(selectedValue);
                  }}
                  value={court.find((item) => item.value === value)}
                  name={name}
                  placeholder="Seleccione una opción..."
                  defaultValue={[]}
                  noOptionsMessage={() => (
                    <p>No hay elementos coincidentes para su búsqueda</p>
                  )}
                />
              )}
            />
            {errors.courthouse && (
              <p className="text-sm text-red-500">
                {errors.courthouse.message}
              </p>
            )}
          </div>

          <Input
            type="date"
            register={register}
            name="dateOf_sentences"
            label="Fecha del fallo"
            errors={errors}
            validation={"Complete la fecha del fallo"}
            pointer
          />

          <span className="text-xl font-semibold text-title mt-3">Montos</span>
          {fieldMontos.map((field) => (
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              register={register}
              errors={errors}
              validation={field.validation}
            />
          ))}
          <span className="text-xl font-semibold text-title mt-3">
            Resumen del caso
          </span>
          <div className="flex flex-col gap-y-1 text-left cursor-pointer">
            <label>{"Etiquetas relacionadas al fallo"}</label>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              rules={{
                required: "Seleccione etiquetas relacionadas",
              }}
              render={({ field: { onChange, value, name } }) => {
                const selectedOptions = value.map((selectedValue) => {
                  const tag = tags.find((item) => item.id === selectedValue);
                  return {
                    value: tag.id,
                    label: tag.description,
                  };
                });
                return (
                  <Select
                    key={resetSelectKey}
                    className="border border-[#687073] rounded"
                    options={tags.map((item) => ({
                      value: item.id,
                      label: item.description,
                    }))}
                    isMulti
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map((option) =>
                        option.value.toString()
                      );
                      onChange(selectedValues);
                    }}
                    value={selectedOptions}
                    name={name}
                    placeholder="Seleccione una opción..."
                    isClearable
                    noOptionsMessage={() => (
                      <p>No hay elementos coincidentes para su búsqueda</p>
                    )}
                  />
                );
              }}
            />
            {errors.tags && (
              <p className="text-sm text-red-500">{errors.tags.message}</p>
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
            className="w-24 h-12 bg-button flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md mx-auto hover:bg-buttonHover">
            {"Cargar"} <AiOutlineUpload />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadLegal;
