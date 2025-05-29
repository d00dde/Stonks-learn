import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export function MainPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Hello, Bootstrap!</h1>
      <h2>Have a coffee <FontAwesomeIcon icon={faCoffee} /></h2>
      <button className="btn btn-success">Click me</button>
    </div>
  );
}
