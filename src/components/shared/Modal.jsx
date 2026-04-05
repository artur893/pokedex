import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const numberValidation = {
  required: "Pole wymagane",
  min: {
    value: 1,
    message: "Liczba musi być dodatnia",
  },
  validate: {
    isInteger: (value) =>
      Number.isInteger(Number(value)) || "Liczba musi być całkowita",
  },
};

const textValidation = {
  required: "Pole wymagane",
  minLength: {
    value: 3,
    message: "Nazwa musi mieć co najmniej 3 znaki",
  },
};

function Modal({ isOpen, setIsOpen, isModalCreateMode, pokemon, dbPokemons }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      height: pokemon?.height,
      weight: pokemon?.weight,
      exp: pokemon?.exp,
    },
  });
  const [photoId, setPhotoId] = useState(151);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { data: pokemonPhotoData } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${photoId}`,
  );
  const { send } = useRequest();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isPhotoUsed = dbPokemons.some((poke) => Number(poke.id) === photoId);

  useEffect(() => {
    reset({
      height: pokemon?.height ?? "",
      weight: pokemon?.weight ?? "",
      exp: pokemon?.exp ?? "",
    });
  }, [pokemon, reset]);

  const handleEdit = async (formData) => {
    const isSuccess = await send(
      `http://localhost:3000/pokemons/${pokemon.id}`,
      "PATCH",
      {
        height: Number(formData.height),
        weight: Number(formData.weight),
        exp: Number(formData.exp),
      },
    );
    if (isSuccess) {
      enqueueSnackbar(`Zmieniono atrybuty ${pokemon.name}`, {
        variant: "success",
      });
      navigate("/home");
    } else {
      enqueueSnackbar(`Błąd edycji`, {
        variant: "error",
      });
    }
  };

  const handleCreate = async (formData) => {
    if (isPhotoUsed) {
      enqueueSnackbar(`Wybierz inną grafikę`, {
        variant: "error",
      });
    } else {
      const isSuccess = await send(`http://localhost:3000/pokemons`, "POST", {
        id: Number(photoId),
        name: formData.name,
        height: Number(formData.height),
        weight: Number(formData.weight),
        exp: Number(formData.exp),
        photo: pokemonPhotoData.sprites.other["official-artwork"].front_default,
      });
      if (isSuccess) {
        enqueueSnackbar(`Dodano pokemona ${formData.name}`, {
          variant: "success",
        });
        navigate("/home");
      } else {
        enqueueSnackbar(`Błąd edycji`, {
          variant: "error",
        });
      }
    }
  };

  const onSubmit = async (formData) => {
    isModalCreateMode ? handleCreate(formData) : handleEdit(formData);
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="p-4 bg-gray-200 dark:bg-slate-900 rounded shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between">
              {isModalCreateMode ? (
                <h1 className="font-bold text-lg">Stwórz pokemona</h1>
              ) : (
                <h1 className="font-bold text-lg capitalize">
                  {pokemon?.name}
                </h1>
              )}
              <button>
                <XMarkIcon
                  className="h-6 w-6 text-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                />
              </button>
            </div>
            {isModalCreateMode && (
              <div>
                <label htmlFor="name">Nazwa</label>
                <Input
                  type="text"
                  id="name"
                  {...register("name", textValidation)}
                />
                <p className="text-xs text-red-500">{errors?.name?.message}</p>
              </div>
            )}
            <div>
              <label htmlFor="height">Wzrost</label>
              <Input
                type="number"
                id="height"
                {...register("height", numberValidation)}
              />
              <p className="text-xs text-red-500">{errors?.height?.message}</p>
            </div>
            <div>
              <label htmlFor="weight">Waga</label>
              <Input
                type="number"
                id="weight"
                {...register("weight", numberValidation)}
              />
              <p className="text-xs text-red-500">{errors?.weight?.message}</p>
            </div>
            <div>
              <label htmlFor="exp">Doświadczenie</label>
              <Input
                type="number"
                id="exp"
                {...register("exp", numberValidation)}
              />
              <p className="text-xs text-red-500">{errors?.exp?.message}</p>
            </div>
            {isModalCreateMode && (
              <div>
                <label>Grafika</label>
                <div className="flex items-center">
                  <ArrowLeftIcon
                    className={`h-6 w-6 text-gray-700 hover:text-gray-500 ${photoId === 151 ? "opacity-0" : ""}`}
                    onClick={() => {
                      if (photoId > 151) {
                        setIsImageLoading(true);
                        setPhotoId((prev) => prev - 1);
                      }
                    }}
                  />
                  <img
                    className={`w-40 m-auto ${isImageLoading ? "opacity-0" : isPhotoUsed ? "opacity-30" : ""}`}
                    src={
                      pokemonPhotoData.sprites.other["official-artwork"]
                        .front_default
                    }
                    alt={pokemonPhotoData.name}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  <ArrowRightIcon
                    className={`h-6 w-6 text-gray-700 hover:text-gray-500 ${photoId === 1025 ? "opacity-0" : ""}`}
                    onClick={() => {
                      if (photoId < 1025) {
                        setIsImageLoading(true);
                        setPhotoId((prev) => prev + 1);
                      }
                    }}
                  />
                </div>
              </div>
            )}
            <Button variant="outline">
              {isModalCreateMode ? "Stwórz" : "Zmień atrybuty"}
            </Button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
