import { useState } from "react";
import type { NWords } from "../types/NWords.ts";

type TProps = {
  word: NWords.TWordDbData,
  updateWordStatus: (id: string, status: NWords.TWordStatus) => void,
  status: NWords.TWordStatus,
  timeField: "learnedAtA" | "learnedAtB",
};

type TButtonProps = {
  id: string,
  action: NWords.TWordStatus,
  updateWordStatus: (id: string, status: NWords.TWordStatus) => void,
};

function Button({id, action, updateWordStatus }:  TButtonProps) {
  const colors: Record<NWords.TWordStatus, string> = {
    new: "btn-info",
    learn: "btn-primary",
    skip: "btn-warning",
    known: "btn-success",
  };
  return <button onClick={() => updateWordStatus(id, action)} className={`btn ${colors[action]} m-1 w-75`}>{action.toUpperCase()}</button>;
}

export function SetWordCard({ word, updateWordStatus, status, timeField }: TProps) {
  const [hideTranslation, setHideTranslation] = useState(true);
  return (
    <div className="p-2 m-1 w-75 bg-info-subtle d-flex align-items-center shadow-sm">
      <div className="w-50 d-flex flex-column align-items-center">
        <div className="fw-bold">{word.word}</div>
        { status !== "learn" && ( hideTranslation
          ? <button onClick={() => setHideTranslation(false)} className="btn btn-success m-2 w-50">Show</button>
          : <div className="text-success">{word.translation}</div>)
        }
        { status === "learn" &&
          <>
            <div className="text-success">{word.translation}</div>
            <div className="text-warbing align-self-start p-1">Add: {Math.floor((Date.now() - (word[timeField] ?? 0))/86400000)} d.a.</div>
          </>
        }
      </div>
      <div className="w-50  d-flex flex-column flex-md-row justify-content-end align-items-center">
        {(["new", "learn", "skip", "known"] as NWords.TWordStatus[])
          .filter((item) => item !== status)
          .map((item => <Button
            id={word.id}
            updateWordStatus={updateWordStatus}
            action={item}
            key={item}
          />))
        }
      </div>
    </div>
  );
}
