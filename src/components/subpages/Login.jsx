import { LoginContext } from "../../context/LoginContext";
import useLogin from "../../hooks/useLogin";
import { Button, Input } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Login() {
  const { login, loggedUser, isLoading } = useLogin();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { message, variant, ok } = await login(
      formData.login,
      formData.password,
    );
    enqueueSnackbar(message, { variant: variant });
    if (ok) {
      navigate("/home");
    }
  };

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser, setUser]);

  return (
    <>
      {isLoading ? (
        <p className="flex-1 flex justify-center items-center">Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-200 dark:bg-slate-900 border-gray-400 dark:border-slate-950 border-2 rounded-xl m-auto my-12 p-4 sm:p-6 max-w-[90%] w-80 flex flex-col gap-6"
        >
          <h1 className="text-xl font-bold">Zaloguj</h1>
          <div>
            <label htmlFor="login">Login</label>
            <Input
              {...register("login")}
              id="login"
              placeholder="Wpisz login"
              className="border-slate-500"
            />
          </div>

          <div>
            <label htmlFor="password">Hasło</label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Wpisz hasło"
              className="border-slate-500"
            />
          </div>

          <Button>Wyślij</Button>
        </form>
      )}
    </>
  );
}

export default Login;
