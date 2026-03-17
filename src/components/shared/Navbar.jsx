import logo from "../../icons/logo.png";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Switch } from "@material-tailwind/react";
import { Collapse, List } from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";
import { FaUser } from "react-icons/fa";
import { LoginContext } from "../../context/LoginContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("isDark") === "true",
  );
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isDark", "false");
    }
  }, [isDark]);

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <Link to="home">
          <img src={logo} alt="pokemon-logo" className="h-10 sm:h-20" />
        </Link>
        <List className="sm:hidden min-w-48">
          <List.Item
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48"
          >
            {user ? user.name : "Menu"}
            <List.ItemEnd>
              <NavArrowDown
                className={`h-5 w-5 stroke-[1.5] ${isOpen ? "rotate-180" : ""}`}
              />
            </List.ItemEnd>
          </List.Item>
          <Collapse open={isOpen}>
            <List className="min-w-48">
              {user ? (
                <>
                  <Link to="favorite">
                    <List.Item>Ulubione</List.Item>
                  </Link>
                  <Link to="arena">
                    <List.Item>Arena</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Ranking</List.Item>
                  </Link>
                  <Link>
                    <List.Item>Edycja</List.Item>
                  </Link>
                  <Link to="login">
                    <List.Item onClick={logout}>Wyloguj</List.Item>
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
            {user ? (
              <span className="flex items-center gap-1 text-sm self-center font-bold ml-8">
                <FaUser /> {user.name}
              </span>
            ) : (
              ""
            )}
          </div>
          <nav className="hidden sm:flex gap-4">
            {user ? (
              <>
                <Link to="favorite">
                  <Button variant="solid">Ulubione</Button>
                </Link>
                <Link to="arena">
                  <Button variant="solid">Arena</Button>
                </Link>
                <Link>
                  <Button variant="solid">Ranking</Button>
                </Link>
                <Link>
                  <Button variant="solid">Edycja</Button>
                </Link>
                <Link to="login">
                  <Button variant="solid" onClick={logout}>
                    Wyloguj
                  </Button>
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
