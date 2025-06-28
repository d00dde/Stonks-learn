import { Navbar } from "./Navbar/Navbar.tsx";
import { Router } from "./Router.tsx";

export function App() {
  return (
    <div className="app">
      <Navbar />
      <Router />
    </div>
  );
}
