import { Navbar } from "./Navbar/Navbar.tsx";
import { Router } from "./Router.tsx";
import { useAppSelector } from "../store/hooks.ts";

export function App() {
  const theme = useAppSelector((state) => state.appData.theme);
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Router />
    </div>
  );
}
