import { useState } from "react";
import { CARDS_DATA } from "./data.ts";
import { TaskCard } from "./TaskCard.tsx";
import "./TaskScreen.css";

export function TaskScreen() {
  const [data, setData] = useState(() => shuffleData(CARDS_DATA));
  const [currentCard, setCurrentCard] = useState(0);
  function successHandler() {
    if (currentCard < CARDS_DATA.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  }
  function restartHandler() {
    setCurrentCard(0);
    setData(shuffleData(CARDS_DATA));
  }
  function shuffleData<T>(data: T[]) {
    return data.map((item: T) => item).sort(() => Math.random() - 0.5);
  }
  return (
    <>
      <div className="h3 m-2">Progress: {currentCard + 1} / {data.length}</div>
      <div className="btn btn-primary m-2" onClick={restartHandler}>Restart</div>
      <TaskCard cardData={data[currentCard]} successHandler={successHandler} key={data[currentCard].title}/>
    </>
  );
}
