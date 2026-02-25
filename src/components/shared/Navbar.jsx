import logo from "../../icons/logo.png";
import { useEffect, useState } from "react";
import { Button, Switch } from "@material-tailwind/react";
import { Collapse, List } from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("isDark") === "true",
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isDark", "false");
    }
  }, [isDark]);

  return (
    <>
      <header className="flex justify-between p-4">
        <img src={logo} alt="pokemon-logo" className="h-10 sm:h-20" />
        <List className="sm:hidden min-w-48">
          <List.Item
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48"
          >
            Menu
            <List.ItemEnd>
              <NavArrowDown
                className={`h-5 w-5 stroke-[1.5] ${isOpen ? "rotate-180" : ""}`}
              />
            </List.ItemEnd>
          </List.Item>
          <Collapse open={isOpen}>
            <List className="min-w-48">
              <List.Item>Ulubione</List.Item>
              <List.Item>Arena</List.Item>
              <List.Item>Ranking</List.Item>
              <List.Item>Edycja</List.Item>
              <List.Item>Wyloguj</List.Item>
              <List.Item>
                <Switch
                  checked={isDark}
                  onChange={() => setIsDark((prev) => !prev)}
                />
              </List.Item>
            </List>
          </Collapse>
        </List>
        <div className="hidden sm:flex flex-col justify-center gap-2">
          <div className="flex align-middle justify-end gap-2">
            <span className="text-sm self-center font-medium">
              Tryb {isDark ? "ciemny" : "jasny"}
            </span>
            <Switch
              checked={isDark}
              onChange={() => setIsDark((prev) => !prev)}
            />
          </div>
          <nav className="hidden sm:flex gap-4">
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
