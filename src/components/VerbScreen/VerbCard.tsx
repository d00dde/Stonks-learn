import { useState } from "react";
// import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
// import correctAnswer from "../../sounds/correct-answer.wav";
// import wrongAnswer from "../../sounds/wrong-answer.wav";

type TCardData = {
  v1: string;
  v2: string;
  v3: string;
};

type TProps = {
  cardData: TCardData,
  successHandler: (score: number) => void;
};

export function VerbCard({ cardData, successHandler }: TProps) {
  const [answer, setAnswer] = useState<Record<keyof TCardData, string>>({
    v1: "",
    v2: "",
    v3: "",
  });
  // const [answerV2, setAnswerV2] = useState("");
  // const [answerV3, setAnswerV3] = useState("");
  // const [statusV1, setStatusV1] = useState<"answer" | "success" | "fail">("answer");
  // const [statusV2, setStatusV2] = useState<"answer" | "success" | "fail">("answer");
  // const [statusV3, setStatusV3] = useState<"answer" | "success" | "fail">("answer");
  // const [score, setScore] = useState(2);

  // function checkHandler(field: keyof TProps["cardData"]) {
  //   const compare = answer.trim().toLowerCase() === cardData.translate.trim().toLowerCase();
  //   else {
  //     compare = answer.trim().toLowerCase().includes(cardData.translate.trim().toLowerCase());
  //   }
  //   if (compare) {
  //     setStatus("success");
  //     new Audio(correctAnswer).play();
  //     setTimeout(() => {
  //       successHandler(score);
  //     }, 1000);
  //     return;
  //   }
  //   setAnswer("");
  //   setStatus("fail");
  //   setScore(prev => prev > 0 ? prev - 1 : 0);
  //   new Audio(wrongAnswer).play();
  // }
  //
  // function speak() {
  //   const utterance = new SpeechSynthesisUtterance(cardData.translate);
  //   utterance.lang = "en";
  //   window.speechSynthesis.speak(utterance);
  // }
  //
  // const cardClass = status === "answer"
  //   ? "" : status === "success" ? "bg-success text-white" :  "bg-danger text-white";
  return (
    <div className="task-screen container-fluid container">
      TODO
      {/*{score < 2 && <div>Tip: {cardData.translate.replace(/(?!^)[^\s]/g, "*")}</div>}*/}
      {/*{score < 1 && <button onClick={speak} className="btn btn-success m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>}*/}
      {/*<div className={`card h1 text-center text-capitalize p-4 ${cardClass}`}>*/}
      {/*  {cardData.title}*/}
      {/*</div>*/}
      {/*<div className="d-flex justify-content-around w-75">*/}
      {/*  <VoiceCatcher setTranscript={setAnswer}/>*/}
      {/*  <button onClick={() => checkHandler(true)} className="btn btn-success m-3">Check</button>*/}
      {/*  <button onClick={() => checkHandler(false)} className="btn btn-success m-3">Check in phrase</button>*/}
      {/*</div>*/}
      {/*<div className="d-flex align-items-center w-75 mt-2 flex-column flex-md-row">*/}
      {/*  <div className="h2 text-center me-auto">Answer:</div>*/}
      {/*  <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="h2 text-center mx-auto form-control" />*/}
      {/*</div>*/}
    </div>
  );
}
