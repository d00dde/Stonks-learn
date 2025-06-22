import { useState } from "react";
import { VoiceCatcher } from "../VoiceCatcher/VoiceCatcher.tsx";

type TProps = {
  cardData: {
    title: string;
    translate: string;
  },
  successHandler: () => void;
};

export function TaskCard({ cardData, successHandler }: TProps) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"answer" | "success" | "fail">("answer");

  function checkHandler() {
    if (answer === cardData.translate) {
      setStatus("success");
      setTimeout(() => {
        successHandler();
      }, 1000);
      return;
    }
    setAnswer("");
    setStatus("fail");
  }
  return (
    <div className="task-screen container-fluid container">
      <div className="text-center h1">{status}</div>
      <div className="card h1 text-center text-capitalize p-4">
        {cardData.title}
      </div>
      <div className="d-flex justify-content-around w-75">
        <VoiceCatcher setTranscript={setAnswer}/>
        <button onClick={checkHandler} className="btn btn-success m-3">Check</button>
      </div>
      <div className="d-flex align-items-center w-75 mt-2">
        <div className="h2 text-center me-auto">Answer:</div>
        <div className="h2 text-center mx-auto">{answer}</div>
      </div>
    </div>
  );
}
