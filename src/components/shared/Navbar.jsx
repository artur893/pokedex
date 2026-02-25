import logo from "../../icons/logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Switch } from "@material-tailwind/react";
import { Collapse, List } from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
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
              {isLogged ? (
                <>
                  <Link>
                    <List.Item>Ulubione</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Arena</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Ranking</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Edycja</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Wyloguj</List.Item>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="login">
                    <List.Item>Zaloguj</List.Item>
                  </Link>
                  <Link to="register">
                    <List.Item>Zarejestruj</List.Item>
                  </Link>
                </>
              )}

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
            {isLogged ? (
              <>
                <Link>
                  <Button variant="solid">Ulubione</Button>
                </Link>
                <Link>
                  <Button variant="solid">Arena</Button>
                </Link>
                <Link>
                  <Button variant="solid">Ranking</Button>
                </Link>
                <Link>
                  <Button variant="solid">Edycja</Button>
                </Link>
                <Link>
                  <Button variant="solid">Wyloguj</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="login">
                  <Button variant="solid">Zaloguj</Button>
                </Link>
                <Link to="register">
                  <Button variant="solid">Zarejestruj</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
