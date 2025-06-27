import { useState } from "react";
import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import correctAnswer from "../../sounds/correct-answer.wav";
import wrongAnswer from "../../sounds/wrong-answer.wav";


type TCardData = {
  translate: string;
  v1: string;
  v2: string;
  v3: string;
};

type TVerbForms = keyof Omit<TCardData, "translate" >;

type TState<T> = Record<TVerbForms, T>;

type TProps = {
  cardData: TCardData,
  successHandler: (score: number) => void;
};


export function VerbCard({ cardData, successHandler }: TProps) {
  console.log(cardData);
  console.log(successHandler)
  const [answer, setAnswer] = useState<TState<string>>({
    v1: "",
    v2: "",
    v3: "",
  });
  const [status, setStatus] = useState<TState<"answer" | "success" | "fail">>({
    v1: "answer",
    v2: "answer",
    v3: "answer",
  });
  const [score, setScore] = useState(2);

  function answerHandler(field: TVerbForms, value: string) {
    setAnswer(prev => ({ ...prev, [field]: value }));
  }

  function checkHandler(field: TVerbForms) {
    const compare = answer[field].trim().toLowerCase() === cardData[field].trim().toLowerCase();

    if (compare) {
      setStatus(prev => ({ ...prev, [field]: "success" }));
      new Audio(correctAnswer).play();
      // setTimeout(() => {
      //   successHandler(score);
      // }, 1000);
      return;
    }
    setAnswer(prev => ({ ...prev, [field]: "" }));
    setStatus(prev => ({ ...prev, [field]: "fail" }));
    setScore(prev => prev > 0 ? prev - 1 : 0);
    new Audio(wrongAnswer).play();
  }

  function checkAll() {
    return Object.values(status).every((value) => value === "success");
  }

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";
    window.speechSynthesis.speak(utterance);
  }

  console.log(checkAll())
  //
  // const cardClass = status === "answer"
  //   ? "" : status === "success" ? "bg-success text-white" :  "bg-danger text-white";
  return (
    <div className="task-screen container-fluid container">
      <div className={`card h1 text-center text-capitalize p-4`}>
        {cardData.translate}
      </div>
      <div className="d-flex justify-content-around w-75">
        <VoiceCatcher setTranscript={(value: string) => answerHandler("v1", value)}/>
        <input value={answer.v1} onChange={(e) => answerHandler("v1", e.target.value)} className="h2 text-center mx-auto form-control" />
        <button onClick={() => checkHandler("v1")} className="btn btn-success m-3">Check</button>
        <div>{status.v1}</div>
        {score < 3 && <button onClick={() => speak(cardData.v1)} className="btn btn-success m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>}
      </div>
      <div className="d-flex justify-content-around w-75">
        <VoiceCatcher setTranscript={(value: string) => answerHandler("v2", value)}/>
        <input value={answer.v2} onChange={(e) => answerHandler("v2", e.target.value)} className="h2 text-center mx-auto form-control" />
        <button onClick={() => checkHandler("v2")} className="btn btn-success m-3">Check</button>
        <div>{status.v2}</div>
        {score < 3 && <button onClick={() => speak(cardData.v2)} className="btn btn-success m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>}
      </div>
      <div className="d-flex justify-content-around w-75">
        <VoiceCatcher setTranscript={(value: string) => answerHandler("v3", value)}/>
        <input value={answer.v3} onChange={(e) => answerHandler("v3", e.target.value)} className="h2 text-center mx-auto form-control" />
        <button onClick={() => checkHandler("v3")} className="btn btn-success m-3">Check</button>
        <div>{status.v3}</div>
        {score < 3 && <button onClick={() => speak(cardData.v3)} className="btn btn-success m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>}
      </div>
      {checkAll() && <button onClick={() => successHandler(score)} className="btn btn-success m-3">Next</button>}
    </div>
  );
}
