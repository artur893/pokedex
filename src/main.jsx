import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route } from "react-router";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.jsx";
import Register from "./components/subpages/Register.jsx";
import Login from "./components/subpages/Login.jsx";
import Home from "./components/subpages/Home.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { PokemonProvider } from "./context/PokemonContext.jsx";
import { ArenaProvider } from "./context/ArenaContext.jsx";
import { Navigate } from "react-router";
import PokemonDetails from "./components/subpages/PokemonDetails.jsx";
import Arena from "./components/subpages/Arena.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <LoginProvider>
          <PokemonProvider>
            <ArenaProvider>
              <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/" element={<App />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/pokemon/:id" element={<PokemonDetails />} />
                    <Route path="/favorite" element={<Home favorite />} />
                    <Route path="/arena" element={<Arena />} />
                  </Route>
                </Routes>
              </SnackbarProvider>
            </ArenaProvider>
          </PokemonProvider>
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
