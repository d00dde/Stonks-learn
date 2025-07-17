import { useState } from "react";
import { type NGeneral } from "../../types/NGeneral.ts";
import { type NVerbs } from "../../types/NVerbs.ts";
import { Card } from "../Card.tsx";
import { VerbInput } from "./VerbInput.tsx";
import { LifeBar } from "../LifesBar.tsx";
import correctAnswer from "../../sounds/correct-answer.wav";
import wrongAnswer from "../../sounds/wrong-answer.wav";

type TState<T> = Record<NVerbs.TVerbForms, T>;

type TProps = {
  cardData: NVerbs.TVerbData,
  successHandler: (score: number) => void;
};


export function VerbCard({ cardData, successHandler }: TProps) {
  const [status, setStatus] = useState<TState<NGeneral.TTaskStatus>>({
    v1: "answer",
    v2: "answer",
    v3: "answer",
  });

  const [scores, setScores] = useState<TState<number>>({
    v1: 1,
    v2: 1,
    v3: 1,
  });

  const score = Object.values(scores).reduce((acc, value) => acc + value, 0);

  function checkHandler(field: NVerbs.TVerbForms, answer: string) {
    const compare = new RegExp(`(?:^|\\s)${cardData[field]!.trim().toLowerCase()}(?:\\s|$)`).test(answer.trim().toLowerCase());

    if (compare) {
      setStatus(prev => ({ ...prev, [field]: "success" }));
      new Audio(correctAnswer).play();
      return compare;
    }
    setStatus(prev => ({ ...prev, [field]: "fail" }));
    setScores(prev => ({ ...prev, [field]: 0 }));
    new Audio(wrongAnswer).play();
    return compare;
  }

  function checkAll() {
    return Object.values(status).every((value) => value === "success");
  }

  return (
    <div className="container-fluid container mt-4 d-flex flex-column align-items-end">
      <LifeBar score={score}/>
      <Card>
        <div>{cardData.translate}</div>
      </Card>
      <VerbInput verbForm="v1" checkHandler={checkHandler} status={status.v1} correct={cardData.v1} />
      <VerbInput verbForm="v2" checkHandler={checkHandler} status={status.v2} correct={cardData.v2} />
      <VerbInput verbForm="v3" checkHandler={checkHandler} status={status.v3} correct={cardData.v3} />
      {checkAll() && <div onClick={() => successHandler(score)} className="btn btn-success m-3">Next &gt;&gt;</div>}
    </div>
  );
}
