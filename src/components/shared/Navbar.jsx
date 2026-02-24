import logo from "../../icons/logo.png";
import { Button, Switch } from "@material-tailwind/react";

function Navbar() {
  return (
    <>
      <header className="flex justify-between p-4">
        <img src={logo} alt="pokemon-logo" className="h-20" />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex align-middle justify-end gap-2">
            <Switch />
            <span className="text-sm self-center font-medium">Dark mode</span>
          </div>
          <nav className="flex gap-4">
            <Button variant="solid">Ulubione</Button>
            <Button variant="solid">Arena</Button>
            <Button variant="solid">Ranking</Button>
            <Button variant="solid">Edycja</Button>
            <Button variant="solid">Wyloguj</Button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
