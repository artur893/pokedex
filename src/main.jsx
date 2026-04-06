import "./index.css";
import App from "./App.jsx";
import Arena from "./components/subpages/Arena.jsx";
import Edit from "./components/subpages/Edit.jsx";
import Home from "./components/subpages/Home.jsx";
import Login from "./components/subpages/Login.jsx";
import PokemonDetails from "./components/subpages/PokemonDetails.jsx";
import Ranking from "./components/subpages/Ranking.jsx";
import Register from "./components/subpages/Register.jsx";
import { ArenaProvider } from "./context/ArenaProvider.jsx";
import { LoginProvider } from "./context/LoginProvider.jsx";
import { PokemonProvider } from "./context/PokemonProvider.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router";

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
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/edit" element={<Edit />} />
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
