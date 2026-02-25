import Navbar from "./components/shared/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="bg-gray-300 dark:bg-slate-800 text-gray-800 dark:text-slate-200 min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
