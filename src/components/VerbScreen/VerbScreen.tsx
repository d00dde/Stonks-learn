import { useState, useEffect } from "react";
import { VerbCard } from "./VerbCard.tsx";
import { CompleteScreen } from "../CompleteScreen.tsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/firebbase.ts";
import "./VerbScreen.css";
import completeTask from "../../sounds/complete-task.wav";

type TVerbData = {
  v1: string;
  v2: string;
  v3: string;
};

type TProps = {
  collectionName: string,
}

export function VerbScreen({ collectionName }: TProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [verbs, setVerbs] = useState<TVerbData[]>([]);
  const maxScore = verbs.length * 2;

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map(doc => ({ ...doc.data() })) as TVerbData[];
      setVerbs(shuffleData(data));
    };
    fetchWords();
  }, []);

  function successHandler(cardScore: number) {
    setScore(prev => prev + cardScore);
    if (currentCard < verbs.length - 1) {
      return setCurrentCard(currentCard + 1);
    }
    new Audio(completeTask).play();
    setIsCompleted(true);
  }
  function restartHandler() {
    setCurrentCard(0);
    setScore(0);
    setVerbs(shuffleData(verbs));
    setIsCompleted(false);
  }
  function shuffleData<T>(data: T[]) {
    return data.map((item: T) => item).sort(() => Math.random() - 0.5);
  }

  if (verbs.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="h3 m-2">Progress: {currentCard + 1} / {verbs.length}</div>
      <div className="h3 m-2">Score: {score} / {maxScore}</div>
      <div className="btn btn-primary m-2" onClick={restartHandler}>Restart</div>
      {
        isCompleted ? <CompleteScreen score={score} maxScore={maxScore} />
          : <VerbCard cardData={verbs[currentCard]} successHandler={successHandler} key={verbs[currentCard].v1}/>
      }
    </>
  );
}
