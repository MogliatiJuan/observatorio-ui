import MySwal from "@Utils/swal";

const showError = ({ error, title = false, text = false }) =>
  MySwal.fire({
    title: !title ? "Detalle del Error" : title,
    text: !text
      ? `${error?.response?.data.status} - ${
          error?.response?.data?.error || error?.response?.data?.code
        } - ${error?.response?.data?.message} ${
          error?.response?.data?.details !== null
            ? ` - ${error?.response?.data?.details}`
            : ""
        }`
      : text,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#0477AD",
  });

export default showError;
