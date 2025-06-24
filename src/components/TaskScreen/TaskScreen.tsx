import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard.tsx";
import { CompleteScreen } from "./CompleteScreen.tsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/firebbase.ts";
import "./TaskScreen.css";
import completeTask from "../../sounds/complete-task.wav";

type TWordData = {
  title: string;
  translate: string;
};

export function TaskScreen() {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [words, setWords] = useState<TWordData[]>([]);
  const maxScore = words.length * 2;

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, 'words'));
      const data = snapshot.docs.map(doc => ({ ...doc.data() })) as TWordData[];
      setWords(shuffleData(data));
    };
    fetchWords();
  }, []);

  function successHandler(cardScore: number) {
    setScore(prev => prev + cardScore);
    if (currentCard < words.length - 1) {
      return setCurrentCard(currentCard + 1);
    }
    new Audio(completeTask).play();
    setIsCompleted(true);
  }
  function restartHandler() {
    setCurrentCard(0);
    setWords(shuffleData(words));
    setIsCompleted(false);
  }
  function shuffleData<T>(data: T[]) {
    return data.map((item: T) => item).sort(() => Math.random() - 0.5);
  }

  if (words.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="h3 m-2">Progress: {currentCard + 1} / {words.length}</div>
      <div className="h3 m-2">Score: {score} / {maxScore}</div>
      <div className="btn btn-primary m-2" onClick={restartHandler}>Restart</div>
      {
        isCompleted ? <CompleteScreen score={score} maxScore={maxScore} />
          : <TaskCard cardData={words[currentCard]} successHandler={successHandler} key={words[currentCard].title}/>
      }
    </>
  );
}
