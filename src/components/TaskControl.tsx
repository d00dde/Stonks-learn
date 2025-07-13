import type { NWords } from "../types/NWords.ts";

type TProps = {
  currentCard: number;
  cardCount: number;
  score: number;
  factor: number;
  restartHandler: () => void;
  status: NWords.TStatus,
  repeatCards: number,
  mode: NWords.TMode;
  setMode: (mode: NWords.TMode) => void;
  taskType: NWords.TTaskType;
  setTaskType: (mode: NWords.TTaskType) => void;
};

export function TaskControl({
  currentCard,
  cardCount,
  score,
  factor,
  restartHandler,
  status,
  repeatCards,
  mode,
  setMode,
  taskType,
  setTaskType,
}: TProps) {
  return (
    <div className="d-flex justify-content-between">
      {status === "mainTask" && <div className="d-flex flex-column ">
        <div className="h3 m-2">Progress: <br/> {currentCard + 1} / {cardCount}</div>
        <div className="h3 m-2">Score: <br/> {score} / {factor * currentCard}</div>
      </div>}
      {status === "repeat" && <div className="d-flex flex-column ">
        <div className="h3 m-2">Repeat: {currentCard + 1} / {repeatCards}</div>
      </div>}
      <div className="btn btn-primary m-2 h-50" onClick={restartHandler}>Restart</div>
      <div className="d-flex flex-column">
        <div>
          <input
            type="checkbox"
            className="btn-check"
            id="taskType"
            autoComplete="off"
            onChange={() => taskType === "text" ? setTaskType("voice") : setTaskType("text") }/>
          <label className="btn btn-outline-primary m-2" htmlFor="taskType">{taskType}</label>
        </div>
        {status === "mainTask" && currentCard === 0 &&
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
              {mode}
            </button>
            <ul className="dropdown-menu bg-success">
              <li><a className="dropdown-item" href="#" onClick={() => setMode("normal")} key="normal">Normal</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setMode("reverse")} key="reverse">Reverse</a></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
}
