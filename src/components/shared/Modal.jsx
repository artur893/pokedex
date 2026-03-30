import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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

  useEffect(() => {
    if (pokemon) {
      reset({
        height: pokemon.height,
        weight: pokemon.weight,
        exp: pokemon.exp,
      });
    }
  }, [pokemon, reset]);

  const onSubmit = (data) => console.log(data);

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
