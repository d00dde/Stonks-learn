import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { type NGeneral } from "../types/NGeneral.ts";

type TProps = {
  status: NGeneral.TTaskStatus;
};

export function ShowStatus({ status }: TProps) {
  const marker = status === "success" ? faCheck : status === "fail" ? faXmark : faQuestion;
  const markerColor = status === "success" ? "text-success" : status === "fail" ? "text-danger" : "text-secondary";
  return (
    <div className={`${markerColor} display-5`}><FontAwesomeIcon icon={marker} /></div>
  );
}
