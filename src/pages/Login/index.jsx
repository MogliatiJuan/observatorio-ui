import { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { axiosFallos } from "@Api/index.js";
import { Input } from "@Components";
import Context from "@Context/VerdictsContext.jsx";
import showError from "@Utils/swal/showError";

const LoginView = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setToken } = useContext(Context); // Accede al contexto para obtener setToken

  const handleLogin = (data) => {
    axiosFallos
      .post("/api/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const token = jwtDecode(res.data.token);
        setToken(token);
        const isAdmin = token.rol.some((r) => r.rol === "ADMIN");
        localStorage.setItem("admin", isAdmin);
        reset();
        navigate("/");
      })
      .catch((error) => {
        showError({ error });
      });
  };

  const fields = useMemo(
    () => [
      {
        type: "email",
        name: "email",
        label: "Email",
        required: true,
      },
      {
        type: "password",
        name: "password",
        label: "Contraseña",
        required: true,
      },
    ],
    []
  );

  return (
    <div className="flex items-center justify-center sm:h-outlet">
      <div className="px-8 py-6 my-10 sm:my-4 sm:w-2/3 md:w-2/4 lg:w-2/5 bg-white shadow-lg text-title">
        <h3 className="text-2xl sm:text-3xl font-bold text-center">
          Inicio de sesión
        </h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          {fields.map((f) => (
            <div className="my-3 sm:w-2/3 md:w-3/5  sm:mx-auto" key={f.name}>
              <Input {...f} register={register} errors={errors} />
            </div>
          ))}
          <div className="flex items-baseline justify-center">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-button rounded-lg hover:bg-buttonHover"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
