import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { VscFilterFilled } from "react-icons/vsc";
import Input from "@Components/Input";
import VerdictsContext from "../../context/VerdictsContext";
import { axiosFallos } from "../../api";
import corregirCodificacion from "@Utils/corregirCodificacion";
import { RenderData } from "../../components";

const BrowserVerdicts = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const { verdict, setVerdict } = useContext(VerdictsContext);

  const [factories, setFactories] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [typeTrials, setTipeTryals] = useState([]);
  const [claims, setClaims] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [tribunals, setTribunals] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          factoriesResponse,
          rubroResponse,
          typeTrialResponse,
          claimsResponse,
          provincesResponse,
          tagsResponse,
        ] = await Promise.all([
          axiosFallos.get("/api/datos/empresas"),
          axiosFallos.get("api/datos/rubros"),
          axiosFallos.get("/api/datos/tipojuicio"),
          axiosFallos.get("/api/datos/reclamos"),
          axiosFallos.get("/api/datos/provincias"),
          axiosFallos.get("/api/datos/etiquetas"),
        ]);

        setFactories(factoriesResponse.data);
        setRubros(rubroResponse.data);
        setTipeTryals(typeTrialResponse.data);
        setClaims(claimsResponse.data);
        setProvinces(provincesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const submitData = async (data) => {
    try {
      setVerdict([]);
      const filteredObj = {};

      for (const key in data) {
        if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
          filteredObj[key] = Array.isArray(data[key])
            ? data[key].map((value) => value.value)
            : data[key];
        }
      }

      const result = await axiosFallos.get("/api/fallo/", {
        params: filteredObj,
      });

      setFilter(filteredObj);
      setVerdict(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const provincesSelected = watch("idProvincia");
  const citiesSelected = watch("idCiudad");

  const handleSubmitProvince = async (selectedProvince) => {
    try {
      setValue("idCiudad", null);
      if (selectedProvince !== null) {
        const citiesResponse = await axiosFallos.get(
          `/api/datos/ciudades?idProvincia=${selectedProvince.value}`
        );
        setCities(citiesResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitCity = async (selectedCity) => {
    try {
      setValue("idTribunal", null);
      if (selectedCity !== null) {
        const tribunalsResponse = await axiosFallos.get(
          `/api/datos/juzgados?idCiudad=${selectedCity.value}`
        );
        setTribunals(tribunalsResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCleanForm = () => {
    reset();
    setVerdict(null);
  };

  const browserFields = useMemo(
    () => [
      { label: "Actor", name: "actor", type: "text" },
      {
        label: "Demandado",
        name: "demandado",
        type: "select",
        options: factories,
        isMulti: true,
      },
      { label: "Rubro", name: "rubro", type: "select", options: rubros },
      {
        label: "Tipo de Juicio",
        name: "tipoJuicio",
        type: "select",
        options: typeTrials,
      },
      { label: "Causas", name: "causas", type: "select", options: claims },
      { label: "Fecha", name: "fecha", type: "date" },
      {
        label: "Etiquetas",
        name: "etiquetas",
        type: "select",
        options: tags,
        isMulti: true,
      },
    ],
    [factories, typeTrials, tags, rubros, claims]
  );

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-title text-center pt-1 lg:p-0">
        Buscador de Fallos Judiciales
      </h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex flex-col xl:flex-row xl:flex-wrap xl:gap-x-6 xl:gap-y-3 xl:justify-center xl:pt-1">
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
              isMulti={field.isMulti}
              type={field.type}
              control={control}
              setValue={setValue}
              register={register}
              errors={errors}
              className="browser"
            />
          ))}
          <Input
            label="Provincia"
            name="idProvincia"
            type="select"
            options={
              provinces &&
              provinces.map((prov) => ({
                value: parseInt(prov.id),
                label: prov.nombre,
              }))
            }
            onchange={handleSubmitProvince}
            control={control}
            setValue={setValue}
            register={register}
            errors={errors}
            className="browser"
          />
          <Input
            label="Ciudad"
            name="idCiudad"
            type="select"
            control={control}
            setValue={setValue}
            register={register}
            disabled={!provincesSelected}
            onchange={handleSubmitCity}
            options={
              cities &&
              cities.map((city) => ({
                value: parseInt(city.id),
                label: corregirCodificacion(city.nombre),
              }))
            }
            errors={errors}
            className="browser"
          />
          <Input
            label="Tribunal"
            name="idTribunal"
            type="select"
            control={control}
            setValue={setValue}
            register={register}
            disabled={!citiesSelected}
            options={
              tribunals &&
              tribunals.map((trib) => ({
                value: parseInt(trib.id),
                label: corregirCodificacion(trib.nombre),
              }))
            }
            errors={errors}
            className="browser"
          />
        </div>
        <div className="flex justify-center gap-x-8">
          <button
            type="submit"
            className="h-12 bg-[#5a689b] flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md hover:bg-[#434b69]">
            {"Buscar"}
            <span>
              <AiOutlineSearch />
            </span>
          </button>
          <button
            type="button"
            className="h-12 bg-[#5a689b] flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md hover:bg-[#434b69]"
            onClick={handleCleanForm}>
            {"Limpiar fallos"}
            <span>
              <VscFilterFilled />
            </span>
          </button>
        </div>
      </form>
      <hr className="w-5/6 m-auto"></hr>
      {verdict !== null ? (
        <RenderData data={verdict} filter={filter} />
      ) : (
        <>
          <img src="/fallo.png" className="mx-auto w-1/3 lg:w-1/4" />
          <p className="mb-2 flex justify-center">
            Aún no se ha buscado ningún fallo
          </p>
        </>
      )}
    </div>
  );
};

export default BrowserVerdicts;
