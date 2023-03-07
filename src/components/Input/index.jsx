const Input = ({
  label = "",
  name = "",
  register = null,
  errors,
  type = "text",
  options = [],
  ...otherProps
}) => {
  if (type == "select") {
    return (
      <div className="flex flex-col justify-between gap-y-1">
        {label && <label htmlFor={name}>{label}</label>}
        <select
          key={name}
          defaultValue={""}
          name={name}
          {...register(name, { required: "Seleccione una opción" })}
          {...otherProps}
          className={`w-full border border-[#687073] rounded-md cursor-pointer py-2.5 ${
            errors[name] && "border-red-500"
          }`}
        >
          <option value={""} disabled>
            Seleccione...
          </option>
          {options?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  }
  if (type == "file") {
    return (
      <div className="flex flex-col gap-y-1 text-left cursor-pointer">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          {...register(name, { required: "Es obligatorio cargar un archivo" })}
          {...otherProps}
          className={`block py-1.5 w-full text-sm text-slate-500 border border-[#687073] rounded-md cursor-pointer
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            ${errors[name] && "border-red-500"}`}
          placeholder={label}
        />

        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-1 text-left">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        {...register(name, { required: "Debe completar el campo" })}
        {...otherProps}
        className={`border border-[#687073] pl-1 py-2.5 rounded-md outline-none ${
          errors[name] && "border-red-500"
        }`}
        placeholder={label}
      />

      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
