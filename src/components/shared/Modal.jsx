import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import useFetch from "../../hooks/useFetch";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useState } from "react";

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
  const { data: pokemonApi } = useFetch(
    `http://localhost:3000/pokemons/${pokemon?.id}`,
  );
  const { data: pokemonPhotoData } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${photoId}`,
  );
  const { send } = useRequest();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    reset({
      height: pokemon?.height ?? null,
      weight: pokemon?.weight ?? null,
      exp: pokemon?.exp ?? null,
    });
  }, [pokemon, reset]);

  const onSubmit = async (formData) => {
    if (pokemonApi) {
      const json = await send(
        `http://localhost:3000/pokemons/${pokemon.id}`,
        "PATCH",
        {
          height: Number(formData.height),
          weight: Number(formData.weight),
          exp: Number(formData.exp),
        },
      );
      if (json) {
        enqueueSnackbar(`Zmieniono atrybuty ${pokemon.name}`, {
          variant: "success",
        });
        navigate("/home");
      } else {
        enqueueSnackbar(`Błąd edycji`, {
          variant: "error",
        });
      }
    } else {
      const isPhotoUsed = dbPokemons.some(
        (poke) => Number(poke.id) === photoId,
      );
      if (isModalCreateMode && isPhotoUsed) {
        enqueueSnackbar(`Wybierz inną grafikę`, {
          variant: "error",
        });
      }
      if (isModalCreateMode && !isPhotoUsed) {
        const json = await send(`http://localhost:3000/pokemons`, "POST", {
          id: isModalCreateMode ? String(photoId) : String(pokemon.id),
          height: Number(formData.height),
          weight: Number(formData.weight),
          exp: Number(formData.exp),
          ...(isModalCreateMode && {
            photo:
              pokemonPhotoData.sprites.other["official-artwork"].front_default,
            name: formData.name,
          }),
        });

        if (json) {
          enqueueSnackbar(
            `${isModalCreateMode ? `Dodano pokemona ${formData.name}` : `Zmieniono atrybuty ${pokemon.name}`}`,
            {
              variant: "success",
            },
          );
          navigate("/home");
        } else {
          enqueueSnackbar(`Błąd edycji`, {
            variant: "error",
          });
        }
      }
    }
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
                  {...register("name", {
                    required: "Pole wymagane",
                    minLength: {
                      value: 3,
                      message: "Nazwa musi mieć co najmniej 3 znaki",
                    },
                  })}
                />
                <p className="text-xs text-red-500">{errors?.name?.message}</p>
              </div>
            )}
            <div>
              <label htmlFor="height">Wzrost</label>
              <Input
                type="number"
                id="height"
                {...register("height", {
                  required: "Pole wymagane",
                  min: {
                    value: 1,
                    message: "Liczba musi być dodatnia",
                  },
                  validate: {
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Liczba musi być całkowita",
                  },
                })}
              />
              <p className="text-xs text-red-500">{errors?.height?.message}</p>
            </div>
            <div>
              <label htmlFor="weight">Waga</label>
              <Input
                type="number"
                id="weight"
                {...register("weight", {
                  required: "Pole wymagane",
                  min: {
                    value: 1,
                    message: "Liczba musi być dodatnia",
                  },
                  validate: {
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Liczba musi być całkowita",
                  },
                })}
              />
              <p className="text-xs text-red-500">{errors?.weight?.message}</p>
            </div>
            <div>
              <label htmlFor="exp">Doświadczenie</label>
              <Input
                type="number"
                id="exp"
                {...register("exp", {
                  required: "Pole wymagane",
                  min: {
                    value: 1,
                    message: "Liczba musi być dodatnia",
                  },
                  validate: {
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Liczba musi być całkowita",
                  },
                })}
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
                      if (photoId > 151) setPhotoId((prev) => prev - 1);
                    }}
                  />
                  <img
                    className={`w-40 m-auto ${dbPokemons.some((poke) => Number(poke.id) === photoId) ? "opacity-30" : ""}`}
                    src={
                      pokemonPhotoData.sprites.other["official-artwork"]
                        .front_default
                    }
                    alt={pokemonPhotoData.name}
                  />
                  <ArrowRightIcon
                    className={`h-6 w-6 text-gray-700 hover:text-gray-500 ${photoId === 1025 ? "opacity-0" : ""}`}
                    onClick={() => {
                      if (photoId < 1025) setPhotoId((prev) => prev + 1);
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
