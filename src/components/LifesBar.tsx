import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  score: number;
};

export function LifeBar({ score }: TProps) {
  return (
    <div className="d-flex justify-content-end m-4">
      {new Array(score).fill(0).map((_, i) => <FontAwesomeIcon key={i} className="display-5 m-2 text-danger" icon={faHeart} />)}
      {score === 0 && <FontAwesomeIcon className="display-5 m-2 text-secondary" icon={faHeartCrack} />}
    </div>
  );
}
