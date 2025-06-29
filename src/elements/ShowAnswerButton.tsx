import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  answer: string,
}

export function ShowAnswerButton({ answer }: TProps) {
  const [show, setShow] = useState(false);
  return show
    ? <div className="fs-4 m-3">{answer}</div>
    : <div className="btn btn-info h-50 m-3" onClick={() => setShow(true)}>
      <FontAwesomeIcon icon={faEye} />
    </div>;
}
