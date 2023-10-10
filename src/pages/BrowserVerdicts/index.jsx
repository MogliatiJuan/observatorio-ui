import { useForm } from "react-hook-form";
import Input from "@Components/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { axiosFallos } from "../../api";
import { useEffect, useState } from "react";

const BrowserVerdicts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [verdict, setVerdict] = useState(null);
  const [factories, setFactories] = useState("");
  const [rubros, setRubros] = useState("");
  const [typeTrials, setTipeTryals] = useState("");
  const [claims, setClaims] = useState("");
  const [provinces, setProvinces] = useState("");
  const [cities, setCities] = useState("");
  const [tribunals, setTribunals] = useState("");

  useEffect(() => {
    const apiCalls = [
      axiosFallos.get("/api/datos/empresas"),
      axiosFallos.get("api/datos/rubros"),
      axiosFallos.get("/api/datos/tipojuicio"),
      axiosFallos.get("/api/datos/reclamos"),
      axiosFallos.get("/api/datos/provincias"),
      axiosFallos.get("/api/datos/juzgados"),
    ];
    Promise.all(apiCalls)
      .then((res) => {
        const [
          factoriesResponse,
          rubroResponse,
          typeTrialResponse,
          claimsResponse,
          provincesResponse,
          tribunalsResponse,
        ] = res;

        setFactories(factoriesResponse.data);
        setRubros(rubroResponse.data);
        setTipeTryals(typeTrialResponse.data);
        setClaims(claimsResponse.data);
        setProvinces(provincesResponse.data);
        setTribunals(tribunalsResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const submitData = async (data) => {
    const filteredObj = {};

    for (const key in data) {
      if (data[key] !== "") {
        filteredObj[key] = data[key];
      }
    }
    const result = await axiosFallos.get("/api/fallo/", {
      params: filteredObj,
    });

    setVerdict(result.data);
  };

  const handleSubmitProvince = async (selectedProvince) => {
    const citiesResponse = await axiosFallos.get(
      `/api/datos/ciudades?idProvincia=${selectedProvince}`
    );
    setCities(citiesResponse.data);
  };

  const browserFields = [
    { label: "Actor", name: "agent", type: "text" },
    {
      label: "Demandado",
      name: "demandado",
      type: "select",
      options: factories,
    },
    { label: "Rubro", name: "rubro", type: "select", options: rubros },
    {
      label: "Tipo de Juicio",
      name: "tipoJuicio",
      type: "select",
      options: typeTrials,
    },
    { label: "Causas", name: "causas", type: "select", options: claims },
    {
      label: "Provincia",
      name: "idProvincia",
      type: "select",
      options: provinces,
    },
    { label: "Ciudad", name: "idCiudad", type: "select", options: cities },
    { label: "Tribunal", name: "idTribunal", type: "text" },
    { label: "Fecha", name: "fecha", type: "date" },
  ];

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit(submitData)} className="w-1/4 m-auto pt-4">
        {browserFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            options={
              field.options &&
              field.options.map((opt) => ({
                value: parseInt(opt.id),
                label:
                  opt.razon_social ||
                  opt.rubro ||
                  opt.description ||
                  opt.nombre,
              }))
            }
            type={field.type}
            control={control}
            setValue={setValue}
            register={register}
            errors={errors}
            onChange={(selectedProvince) => {
              if (field.name === "idProvincia") {
                handleSubmitProvince(selectedProvince);
              }
            }}
          />
        ))}
        <button
          type="submit"
          className="w-24 h-12 bg-button flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md mx-auto hover:bg-buttonHover"
        >
          {"Buscar"}
          <span>
            <AiOutlineSearch />
          </span>
        </button>{" "}
      </form>
      <hr className="w-5/6 m-auto"></hr>
      <div>
        {verdict === null ? (
          <>
            <img src="/fallo.png" className="m-auto w-1/6" />
            <p className="flex justify-center">
              Aún no se ha buscado ningún fallo
            </p>
          </>
        ) : (
          <div>
            {verdict.flatMap((res) => (
              <div>
                <p>Expte: {res.nroExpediente}</p>
                <p>Demandante: {res.actor}</p>
                <p>
                  Demandado:{" "}
                  {res.demandado.flatMap((dem) => (
                    <span>
                      {dem.razon_social} - {dem.cuit}
                    </span>
                  ))}
                </p>
                <p>Juicio: {res.tipoJuicio}</p>
                <p>Causas: {res.causas}</p>
                <p>Juzgado: {res.juzgado}</p>
                <p>Rubro: {res.rubro}</p>
                <p>Fecha: {res.fecha}</p>
                <p>
                  Etiquetas:{" "}
                  {res.etiquetas.flatMap((tag) => (
                    <span>{tag}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserVerdicts;
