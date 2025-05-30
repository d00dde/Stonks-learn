import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../elements/Spinner.tsx";

export function AboutPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">About, Bootstrap!</h1>
      <h2>Have a coffee <FontAwesomeIcon icon={faAppleWhole}/></h2>
      <button className="btn btn-success m-3">Click me</button>
      <div className="d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    </div>
  );
}
