import { Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage.tsx";
import { AdminPage } from "../pages/AdminPage.tsx";

export const pages = {
  HOME: { title: "Home", to: "/", component: MainPage },
  ADMIN: { title: "Admin", to: "/about", component: AdminPage },
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