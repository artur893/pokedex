import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import useFetch from "../../hooks/useFetch";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

function Modal({ isOpen, setIsOpen, pokemon }) {
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
  const { data: pokemonApi } = useFetch(
    `http://localhost:3000/pokemons/${pokemon?.id}`,
  );
  const { send } = useRequest();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (pokemon) {
      reset({
        height: pokemon.height,
        weight: pokemon.weight,
        exp: pokemon.exp,
      });
    }
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
      const json = await send(
        `http://localhost:3000/pokemons/${pokemon.id}`,
        "POST",
        {
          id: String(pokemon.id),
          height: Number(formData.height),
          weight: Number(formData.weight),
          exp: Number(formData.exp),
        },
      );
      if (json) console.log(json);
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
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
              <h1 className="font-bold capitalize">{pokemon?.name}</h1>
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
            <div>
              <label htmlFor="height">Wzrost</label>
              <Input
                type="number"
                id="height"
                {...register("height", {
                  required: "Pole wymagane",
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
                })}
              />
              <p className="text-xs text-red-500">{errors?.exp?.message}</p>
            </div>
            <Button variant="outline">Zmień atrybuty</Button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
