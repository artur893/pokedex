import { Button, Input } from "@material-tailwind/react";
import { useForm, useWatch } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data) => {
    console.log("wysłano formularz", data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 dark:bg-slate-900 border-gray-400 dark:border-slate-950 border-2 rounded-xl m-auto my-12 p-4 sm:p-6 max-w-[90%] w-80 flex flex-col gap-6"
    >
      <h1 className="text-xl font-bold">Stwórz konto</h1>
      <div>
        <label htmlFor="name">Imię</label>
        <Input
          {...register("name", {
            required: "Pole musi zostać uzupełnione",
            minLength: {
              value: 3,
              message: "Imię musi posiadać co najmniej 3 znaki",
            },
            maxLength: {
              value: 20,
              message: "Maksymalna długość to 20 znaków",
            },
          })}
          id="name"
          placeholder="Wpisz imię"
          className="border-slate-500"
        />
        {errors.name && (
          <p className="text-red-600 font-medium text-xs absolute">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          {...register("email", {
            required: "Pole musi zostać uzupełnione",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Wprowadź poprawny adres email",
            },
          })}
          type="email"
          id="email"
          placeholder="Wpisz email"
          className="border-slate-500"
        />
        {errors.email && (
          <p className="text-red-600 font-medium text-xs absolute">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Hasło</label>
        <Input
          {...register("password", {
            required: "Pole musi zostać uzupełnione",
            minLength: {
              value: 8,
              message: "Hasło musi mieć co najmniej 8 znaków",
            },
            maxLength: {
              value: 20,
              message: "Maksymalna długość to 20 znaków",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/,
              message: "Hasło musi mieć cyfrę, małą i wielką literę",
            },
          })}
          type="password"
          id="password"
          placeholder="Wpisz hasło"
          className="border-slate-500"
        />
        {errors.password && (
          <p className="text-red-600 font-medium text-xs absolute">
            {errors.password.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="repeat">Powtórz hasło</label>
        <Input
          {...register("repeat", {
            required: "Pole musi zostać uzupełnione",
            validate: (value) =>
              value === password || "Hasła muszą być takie same",
          })}
          type="password"
          id="repeat"
          placeholder="Powtórz hasło"
          className="border-slate-500"
        />
        {errors.repeat && (
          <p className="text-red-600 font-medium text-xs absolute">
            {errors.repeat.message}
          </p>
        )}
      </div>
      <Button>Wyślij</Button>
    </form>
  );
}

export default Register;
