import { Button, Input } from "@material-tailwind/react";

function Login() {
  return (
    <>
      <form
        onSubmit={() => console.log("submit")}
        className="bg-gray-200 dark:bg-slate-900 border-gray-400 dark:border-slate-950 border-2 rounded-xl m-auto my-12 p-4 sm:p-6 max-w-[90%] w-80 flex flex-col gap-6"
      >
        <h1 className="text-xl font-bold">Zaloguj</h1>
        <div>
          <label htmlFor="login">Login</label>
          <Input
            id="login"
            placeholder="Wpisz login"
            className="border-slate-500"
          />
        </div>

        <div>
          <label htmlFor="password">Hasło</label>
          <Input
            type="password"
            id="password"
            placeholder="Wpisz hasło"
            className="border-slate-500"
          />
        </div>

        <Button>Wyślij</Button>
      </form>
    </>
  );
}

export default Login;
