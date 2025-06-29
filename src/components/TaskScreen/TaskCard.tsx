import { useState } from "react";
import { type NWords } from "../../types/NWords.ts";
import { Card } from "../Card.tsx";
import { LifeBar } from "../LifesBar.tsx";
import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";
import { ShowStatus } from "../../elements/ShowStatus.tsx";
import { SpeakButton } from "../../elements/SpeakButton.tsx";
import correctAnswer from "../../sounds/correct-answer.wav";
import wrongAnswer from "../../sounds/wrong-answer.wav";
import {ShowAnswerButton} from "../../elements/ShowAnswerButton.tsx";

type TProps = {
  cardData: NWords.TWordData,
  successHandler: (score: number) => void;
};

export function TaskCard({ cardData, successHandler }: TProps) {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(2);
  const [status, setStatus] = useState<"answer" | "success" | "fail">("answer");

  function checkHandler() {
    const compare = new RegExp(`(?:^|\\s)${cardData.translate.trim().toLowerCase()}(?:\\s|$)`).test(answer.trim().toLowerCase());
    if (compare) {
      setStatus("success");
      new Audio(correctAnswer).play();
      setTimeout(() => {
        successHandler(score);
      }, 1000);
      return;
    }
    setAnswer("");
    setStatus("fail");
    setScore(prev => prev > 0 ? prev - 1 : 0);
    new Audio(wrongAnswer).play();
  }

  return (
    <div className="container-fluid container mt-4">
      <LifeBar score={score}/>
      <Card text={cardData.title}/>
      <div className="d-flex align-items-center justify-content-around w-100 mt-2">
        <VoiceCatcher setTranscript={setAnswer}/>
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="fs-3 text-center w-75 form-control m-2" />
        <ShowStatus status={status} />
      </div>
      <div className="d-flex align-items-center justify-content-end">
        {score < 1 && <ShowAnswerButton answer={cardData.translate} />}
        {score < 1 && <SpeakButton text={cardData.translate} />}
        {score < 2 && <div>Tip: {cardData.translate.replace(/(?!^)[^\s]/g, "*")}</div>}
        <button onClick={checkHandler} className="btn btn-success m-3">Check</button>
      </div>
    </div>
  );
}
