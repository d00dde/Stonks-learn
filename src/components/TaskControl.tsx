type TProps = {
  currentCard: number;
  cardCount: number;
  score: number;
  factor: number;
  restartHandler: () => void;
};

export function TaskControl({ currentCard, cardCount, score, factor,  restartHandler }: TProps) {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex flex-column ">
        <div className="h3 m-2">Progress: {currentCard + 1} / {cardCount}</div>
        <div className="h3 m-2">Score: {score} / {factor * currentCard}</div>
      </div>
      <div className="btn btn-primary m-2 h-50" onClick={restartHandler}>Restart</div>
    </div>
  );
}
