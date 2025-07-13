import { useState } from "react";
import { type NWords } from "../../types/NWords.ts";
import { Card } from "../Card.tsx";
import { LifeBar } from "../LifesBar.tsx";
import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";
import { ShowStatus } from "../../elements/ShowStatus.tsx";
import { SpeakButton } from "../../elements/SpeakButton.tsx";
import { ShowAnswerButton } from "../../elements/ShowAnswerButton.tsx";
import correctAnswer from "../../sounds/correct-answer.wav";
import wrongAnswer from "../../sounds/wrong-answer.wav";

type TProps = {
  cardData: NWords.TWordData,
  successHandler: (score: number) => void;
  mode: NWords.TMode;
  taskType: NWords.TTaskType;
};

export function TaskCard({ cardData, successHandler, mode, taskType }: TProps) {
  const [isHold, setIsHold] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(2);
  const [status, setStatus] = useState<"answer" | "success" | "fail">("answer");

  const correct = mode === "normal" ? cardData.translate : cardData.title;
  const question = mode === "normal" ? cardData.title : cardData.translate;

  function prepareString(str: string) {
    return str.trim().toLowerCase().replace("ё", "е").replace(/[.,()]/g, " ");
  }

  function getRegexp(text: string) {
    console.log("check")
    return new RegExp(`(?:^|\\s)${prepareString(text)}(?:\\s|$)`);
  }

  function checkHandler() {
    const compare = answer.length !== 0 && (getRegexp(correct).test(prepareString(answer)) || getRegexp(answer).test(prepareString(correct)));
    if (compare) {
      setStatus("success");
      new Audio(correctAnswer).play();
      if (isHold) {
        setIsComplete(true);
        return
      }
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
      <Card>
        {taskType === "text" ?  <div>{question}</div> : <SpeakButton text={question} lang={ mode === "reverse" ? "en" : "ru"} />}
      </Card>
      <div className="d-flex align-items-center justify-content-around w-100 mt-2">
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="fs-3 text-center w-75 form-control m-2" />
        <ShowStatus status={status} />
        <VoiceCatcher setTranscript={setAnswer} lang={ mode === "normal" ? "en" : "ru"}/>
      </div>
      <div className="d-flex align-items-center justify-content-end">

        {(score < 1 || isComplete) && <SpeakButton text={correct} lang={ mode === "normal" ? "en" : "ru"} />}
        {(score < 2 || isComplete) && <div>Tip: {correct.replace(/(?!^)\S/g, "*")}</div>}
        <div>
          <input type="checkbox" className="btn-check" id="holdCheck" autoComplete="off" onChange={() => setIsHold(prev => !prev)}/>
          <label className="btn btn-outline-primary m-2" htmlFor="holdCheck">{ isHold ? "Unhold" : "Hold"}</label>
        </div>
        {isComplete ?
          <button onClick={() => successHandler(score)} className="btn btn-success m-3">Next</button>
          : <button onClick={checkHandler} className="btn btn-success m-3">Check</button>
        }
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {(score < 1 || isComplete) && <ShowAnswerButton answer={correct} />}
      </div>
    </div>
  );
}
