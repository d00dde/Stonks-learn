import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export function AboutPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">About, Bootstrap!</h1>
      <h2>Have a coffee <FontAwesomeIcon icon={faCoffee} /></h2>
      <button className="btn btn-success">Click me</button>
    </div>
  );
}
