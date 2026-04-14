import useRequest from "../../hooks/useRequest";
import { Button, Input } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

function Register() {
  const { send, isLoading } = useRequest();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  const onSubmit = async (formData) => {
    const isNameResponse = await fetch(
      `http://localhost:3000/users?name=${formData.name}`,
    );
    const isNameExist = await isNameResponse.json();
    const isEmailResponse = await fetch(
      `http://localhost:3000/users?email=${formData.email}`,
    );
    const isEmailExist = await isEmailResponse.json();

    if (isNameExist.length === 0 && isEmailExist.length === 0) {
      const response = await send("http://localhost:3000/users", "POST", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (!response) {
        enqueueSnackbar("Coś poszło nie tak", { variant: "error" });
      } else {
        enqueueSnackbar("Pomyślnie utworzono konto", { variant: "success" });
        navigate("/login");
      }
    } else if (isNameExist.length > 0) {
      enqueueSnackbar("Login jest zajęty", { variant: "error" });
    } else if (isEmailExist.length > 0) {
      enqueueSnackbar("Email jest zajęty", { variant: "error" });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 dark:bg-slate-900 border-gray-400 dark:border-slate-950 border-2 rounded-xl m-auto my-12 p-4 sm:p-6 max-w-[90%] w-80 flex flex-col gap-8"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
                  message:
                    "Hasło musi mieć wielką literę, cyfrę i znak specjalny",
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
        </>
      )}
    </form>
  );
}

export default Register;
