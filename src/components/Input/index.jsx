const Input = ({
  label = "",
  name = "",
  register = null,
  errors,
  type = "text",
  validation,
  pointer,
}) => {
  if (type == "file") {
    return (
      <div className="flex flex-col gap-y-1 text-left cursor-pointer">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          {...register(name, { required: "Es obligatorio cargar un archivo" })}
          className={`block py-1.5 w-full text-sm text-slate-500 border border-[#687073] rounded-md cursor-pointer
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold`}
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
        {...register(name, { required: validation })}
        className={`border border-[#687073] pl-1 py-2 rounded outline-none ${
          pointer ? "cursor-pointer" : ""
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
