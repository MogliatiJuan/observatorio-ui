import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { VscFilterFilled } from "react-icons/vsc";
import { Input, Loader, RenderData } from "@Components";
import { axiosFallos } from "@Api";
import VerdictsContext from "@Context/VerdictsContext";
import corregirCodificacion from "@Utils/corregirCodificacion";
import MySwal from "@Utils/swal";
import showError from "@Utils/swal/showError";
import reload from "@Assets/reload.png";
import fallo from "@Assets/fallo.png";
import noData from "@Assets/noData.png";

const BrowserVerdicts = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm();

  const { verdict, setVerdict, token } = useContext(VerdictsContext);

  const [factories, setFactories] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [typeTrials, setTipeTryals] = useState([]);
  const [claims, setClaims] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [tribunals, setTribunals] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoadingForm(true);
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
        MySwal.fire({
          showCancelButton: true,
          showConfirmButton: true,
          html: `<div class="flex flex-col gap-y-2">
              <img src=${reload} alt="recarga de pagina" />
              <span class="text-lg font-semibold text-title">Hubo un error al obtener los datos del formulario. Intente nuevamente</span>
              </div>`,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Ver detalle de error",
        }).then((res) => {
          if (res.isConfirmed) {
            showError({ error });
          }
        });
      } finally {
        setLoadingForm(false);
      }
    }

    fetchData();
  }, []);

  const submitData = async (data) => {
    setLoading(true);
    try {
      setVerdict([]);
      const filteredObj = {};
      filteredObj.page = 1;
      filteredObj.offset = 10;

      for (const key in data) {
        if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
          filteredObj[key] = Array.isArray(data[key])
            ? data[key].map((value) => value.value)
            : typeof data[key] == "object"
            ? data[key].value
            : data[key];
        }
      }

      const result = await axiosFallos.get("/api/fallo/", {
        params: filteredObj,
      });

      setFilter(filteredObj);
      setVerdict(result.data);
    } catch (error) {
      MySwal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        html: `<div class="flex flex-col gap-y-2">
                  <img src=${noData} alt="recarga de pagina" />
                  <span class="text-lg font-semibold text-title">Hubo un error al obtener los resultados del buscador. Intente nuevamente</span>
                  </div>`,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Ver detalle de error",
      }).then((res) => {
        if (res.isConfirmed) {
          showError({ error });
        }
      });
      console.error(error);
    } finally {
      setLoading(false);
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
      MySwal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        html: `<div class="flex flex-col gap-y-2">
                      <img src=${noData} alt="recarga de pagina" />
                      <span class="text-lg font-semibold text-title">Hubo un error al obtener los resultados de las provincias. Intente nuevamente</span>
                      </div>`,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Ver detalle de error",
      }).then((res) => {
        if (res.isConfirmed) {
          showError({ error });
        }
      });
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
      MySwal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        html: `<div class="flex flex-col gap-y-2">
                      <img src=${noData} alt="recarga de pagina" />
                      <span class="text-lg font-semibold text-title">Hubo un error al obtener los resultados de las ciudades. Intente nuevamente</span>
                      </div>`,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Ver detalle de error",
      }).then((res) => {
        if (res.isConfirmed) {
          showError({ error });
        }
      });
    }
  };

  const handleCleanForm = () => {
    reset();
    setValue("demandado", null);
    setValue("rubro", null);
    setValue("causas", null);
    setValue("tipoJuicio", null);
    setValue("etiquetas", null);
    setValue("idTribunal", null);
    setValue("idCiudad", null);
    setValue("idProvincia", null);
    setValue("demandadoEmpresas", null);
    setValue("actorEmpresas", null);
    setVerdict(null);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const searchAllVerdicts = async () => {
    const result = await axiosFallos.get("/api/fallo/", {
      params: { paranoid: false },
    });
    setVerdict(result.data);
  };

  const browserFields = useMemo(
    () => [
      {
        name: "firmActor",
        label: "Persona jurídica como actor",
        type: "checkbox",
        register: register,
        placeholder: "Seleccione tipo de actor",
        errors: errors,
      },
      !watch("firmActor")
        ? { label: "Actor", name: "actor", type: "text" }
        : {
            label: "Actor",
            name: "actorEmpresas",
            type: "select",
            options: factories,
            isMulti: true,
          },
      {
        name: "personDemandado",
        label: "Persona física como demandado",
        type: "checkbox",
        register: register,
        placeholder: "Seleccione tipo de actor",
        errors: errors,
      },
      !watch("personDemandado")
        ? {
            label: "Demandado",
            name: "demandadoEmpresas",
            type: "select",
            options: factories,
            isMulti: true,
          }
        : { label: "Demandado", name: "demandado", type: "text" },
      {
        label: "Rubro",
        name: "rubro",
        type: "select",
        options: rubros,
        isMulti: true,
      },
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
    [
      factories,
      typeTrials,
      tags,
      rubros,
      claims,
      watch("firmActor"),
      watch("personDemandado"),
    ]
  );

  if (loadingForm)
    return (
      <div className="h-outlet flex justify-center">
        <Loader />
      </div>
    );

  return (
    <div
      className={`h-full w-full p-4 ${
        verdict && loading == false
          ? "md:h-full lg:h-full "
          : "lg:flex lg:flex-col lg:justify-between"
      }`}
    >
      <h1 className="text-3xl font-bold text-title text-center pt-1 lg:p-0 xl:text-4xl">
        BUSCADOR DE FALLOS JUDICIALES
      </h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center xl:flex-row xl:flex-wrap xl:gap-x-6 xl:gap-y-3 xl:justify-center xl:pt-1">
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
                label: corregirCodificacion(prov.nombre),
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
            disabled={isSubmitting}
            type="submit"
            className="h-12 bg-general flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md hover:bg-hoverGeneral"
          >
            {"Buscar"}
            <span>
              <AiOutlineSearch />
            </span>
          </button>
          <button
            disabled={isSubmitting}
            type="button"
            className="h-12 bg-general flex gap-x-2 items-center p-2.5 my-5 text-white font-semibold rounded-md hover:bg-hoverGeneral"
            onClick={handleCleanForm}
          >
            {"Limpiar fallos"}
            <span>
              <VscFilterFilled />
            </span>
          </button>
        </div>
      </form>
      {token && (
        <button
          disabled={isSubmitting}
          type="button"
          className="h-12 mx-auto bg-general flex gap-x-2 justify-between items-center p-2.5 mb-3 text-white font-semibold rounded-md hover:bg-hoverGeneral"
          onClick={searchAllVerdicts}
        >
          {"Buscar todos los fallos borrados"}
          <span>
            <AiOutlineSearch />
          </span>
        </button>
      )}
      <hr className="w-5/6 mx-auto"></hr>
      {loading ? (
        <div className="h-2/5 flex justify-center">
          <Loader />
        </div>
      ) : verdict == null && loading == false ? (
        <>
          <img src={fallo} className="mx-auto w-1/3 md:w-1/4 lg:w-1/5" />
          <p className="flex justify-center">
            Aún no se ha buscado ningún fallo
          </p>
        </>
      ) : (
        <div className="min-h-[28rem]">
          <RenderData data={verdict} filter={filter} />
        </div>
      )}
    </div>
  );
};

export default BrowserVerdicts;
