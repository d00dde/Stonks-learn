import { useState } from "react";
import { type NGeneral } from "../../types/NGeneral.ts";
import { type NVerbs } from "../../types/NVerbs.ts";
import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";
import { ShowStatus } from "../../elements/ShowStatus.tsx";
import { SpeakButton } from "../../elements/SpeakButton.tsx";
import { ShowAnswerButton } from "../../elements/ShowAnswerButton.tsx";

type TProps = {
  correct: string,
  verbForm: NVerbs.TVerbForms,
  status: NGeneral.TTaskStatus,
  checkHandler: (field: NVerbs.TVerbForms, answer: string) => boolean,
};


export function VerbInput({ verbForm, checkHandler, status, correct }: TProps) {
  const [answer, setAnswer ] = useState<string>("");

  function check() {
    if (!checkHandler(verbForm, answer)) {
      setAnswer("");
    }
  }
  return (
    <div className="d-flex justify-content-around w-100 flex-column flex-md-row">
      <div className="d-flex align-items-center flex-grow-1">
          <VoiceCatcher setTranscript={(value: string) => setAnswer(value)} disabled={status === "success"}/>
          <input
            disabled={status === "success"}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="fs-3 text-center form-control h-75 m-2"
          />
          <ShowStatus status={status} />
        </div>
      <div className="d-flex justify-content-end">
        { (status === "success" || status === "fail") && < ShowAnswerButton answer={correct} /> }
        { (status === "success" || status === "fail") && <SpeakButton text={correct} /> }
        <button onClick={check} className="btn btn-success m-3" disabled={status === "success"}>Check</button>
      </div>
    </div>
  );
}
