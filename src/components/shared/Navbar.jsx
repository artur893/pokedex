import { LoginContext } from "../../context/LoginContext";
import logo from "../../icons/logo.png";
import { Button, Collapse, List, Switch } from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("isDark") === "true",
  );
  const { user, setUser } = useContext(LoginContext);
  const authLinks = [
    { to: "favorite", label: "Ulubione" },
    { to: "arena", label: "Arena" },
    { to: "ranking", label: "Ranking" },
    { to: "edit", label: "Edycja" },
    { to: "login", label: "Wyloguj", onClick: logout },
  ];
  const unAuthLinks = [
    { to: "login", label: "Zaloguj" },
    { to: "register", label: "Zarejestruj" },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isDark", "false");
    }
  }, [isDark]);

  function logout() {
    setUser(null);
  }

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
              {(user ? authLinks : unAuthLinks).map((link) => (
                <Link key={link.to} to={link.to}>
                  <List.Item onClick={link.onClick}>{link.label}</List.Item>
                </Link>
              ))}
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
            {(user ? authLinks : unAuthLinks).map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="solid" onClick={link.onClick}>
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
