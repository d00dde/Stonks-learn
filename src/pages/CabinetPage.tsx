import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../store/hooks.ts";

export function CabinetPage() {
  const user = useAppSelector((state) => state.userData.user);
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Hello, {user?.name}!</h1>
      <h2>Have a coffee <FontAwesomeIcon icon={faCoffee} /></h2>
      <button className="btn btn-success">Click me</button>
    </div>
  );
}
