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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <LoginProvider>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
