import { Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage.tsx";
import { AboutPage } from "../pages/AboutPage.tsx";
import { CabinetPage } from "../pages/CabinetPage.tsx";

export const pages = {
  HOME: { title: "Home", to: "/", component: MainPage },
  ABOUT: { title: "About", to: "/about", component: AboutPage },
  CABINET: { title: "Cabinet", to: "/cabinet", component: CabinetPage },
};

export function Router() {
  return (
    <Routes>
      {Object.entries(pages).map(([key, { to, component: Component }]) => (
        <Route key={key} path={to} element={<Component />} />
      ))}
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
}