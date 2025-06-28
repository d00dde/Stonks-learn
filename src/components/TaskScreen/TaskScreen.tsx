import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { type NWords } from "../../types/NWords.ts";
import { CompleteScreen } from "../CompleteScreen.tsx";
import { TaskControl } from "../TaskControl.tsx";
import { TaskCard } from "./TaskCard.tsx";
import { Spinner } from "../../elements/Spinner.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { db } from "../../db/firebbase.ts";
import "./TaskScreen.css";
import completeTask from "../../sounds/complete-task.wav";

type TProps = {
  collectionName: string,
}

export function TaskScreen({ collectionName }: TProps) {
  const factor = 2; // Each verb has 3 forms to answer
  const userName = useAppSelector((state) => state.appData.userName);
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [words, setWords] = useState<NWords.TWordData[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map(doc => ({ ...doc.data() })) as NWords.TWordData[];
      setWords(shuffleData(data));
    };
    fetchWords();
  }, [collectionName, userName]);

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
    return <Spinner />;
  }

  return (
    <div className="container-fluid container align-items-end">
      <TaskControl score={score} factor={factor} currentCard={currentCard} cardCount={words.length} restartHandler={restartHandler}/>
      {
        isCompleted ? <CompleteScreen score={score} maxScore={words.length * factor} />
          : <TaskCard cardData={words[currentCard]} successHandler={successHandler} key={words[currentCard].title}/>
      }
    </div>
  );
}
