import { Controller } from "react-hook-form";
import Select from "react-select";

const Input = ({
  placeholder = "",
  label = "",
  name = "",
  register = null,
  errors,
  type = "text",
  validation,
  options = [],
  noOptionsMessage,
  disabled = false,
  setValue,
  control,
  isMulti = false,
  onchange,
  className,
  createTable = false,
  handleClickCreateTable = null,
}) => {
  const commonStyles = {
    borderRadius: "0.375rem",
    borderColor: "#687073",
  };

  const browserStyle = "w-4/5 px-3 py-1 md:w-2/5 xl:w-1/5 xl:p-0 flex flex-col";

  if (type === "file") {
    return (
      <div className="flex flex-col gap-y-1 text-left cursor-pointer">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          {...register(name, { required: "Es obligatorio cargar un archivo" })}
          className={`block py-1.5 w-full text-sm text-slate-500 border border-[#687073] rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold`}
          placeholder={label}
        />
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  } else if (type === "select") {
    return (
      <div
        className={
          className === "browser"
            ? browserStyle
            : "flex flex-col gap-y-1 text-left"
        }
      >
        {label && <label htmlFor={name}>{label}</label>}
        <div className="flex justify-between">
          <Controller
            name={name}
            control={control}
            rules={{ required: validation }}
            render={({ field }) => (
              <Select
                {...field}
                isSearchable={true}
                isClearable={true}
                isMulti={isMulti}
                isDisabled={disabled}
                options={options}
                placeholder={placeholder || label}
                noOptionsMessage={() => noOptionsMessage || "No hay opciones"}
                className={`cursor-pointer ${
                  className === "browser" ? "w-full" : "w-4/5"
                }`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    ...commonStyles,
                    borderColor: state.isFocused
                      ? "#2563eb"
                      : commonStyles.borderColor,
                    boxShadow: state.isFocused
                      ? "0 0 0 1px #2563eb"
                      : provided.boxShadow,
                    background: "transparent",
                  }),
                }}
                onChange={(selectedOption) => {
                  onchange && onchange(selectedOption);
                  setValue(name, selectedOption);
                }}
              />
            )}
          />
          {createTable && (
            <button
              type="button"
              className="px-2 py-1 text-sm text-white bg-navbar rounded-md h-9"
              onClick={handleClickCreateTable}
            >
              Agregar
            </button>
          )}
        </div>
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  } else if (type === "checkbox") {
    return (
      <div
        className={`${
          className === "browser"
            ? browserStyle
            : "flex flex-row gap-x-3 text-left"
        } !flex-row gap-x-3 items-center mt-3`}
      >
        <input
          type={type}
          {...register(name, { required: validation })}
          className={`rounded-md px-3 py-3 focus:border-1 focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] bg-transparent`}
          placeholder={placeholder || label}
        />
        {label && <label htmlFor={name}>{label}</label>}
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={
          className === "browser"
            ? browserStyle
            : "flex flex-col gap-y-1 text-left"
        }
      >
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          {...register(name, { required: validation })}
          className={`rounded-md py-1.5 focus:border-1 focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] h-9 bg-transparent`}
          placeholder={placeholder || label}
        />
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  }
};

export default Input;
