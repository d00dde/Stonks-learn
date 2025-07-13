import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { type NVerbs } from "../../types/NVerbs.ts";
import { db } from "../../db/firebbase.ts";
import { Spinner } from "../../elements/Spinner.tsx";
import { TaskControl } from "../TaskControl.tsx";
import { CompleteScreen } from "../CompleteScreen.tsx";
import { VerbCard } from "./VerbCard.tsx";
import completeTask from "../../sounds/complete-task.wav";
import "./VerbScreen.css";


type TProps = {
  collectionName: string,
}

export function VerbScreen({ collectionName }: TProps) {
  const factor = 3; // Each verb has 3 forms to answer
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [verbs, setVerbs] = useState<NVerbs.TVerbData[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map(doc => ({ ...doc.data() })) as NVerbs.TVerbData[];
      setVerbs(shuffleData(data));
    };
    fetchWords();
  }, [collectionName]);

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
    return <Spinner />;
  }

  return (
    <div className="container-fluid container align-items-end">
      <TaskControl
        score={score}
        factor={factor}
        currentCard={currentCard}
        cardCount={verbs.length}
        restartHandler={restartHandler}
        status="mainTask"
        repeatCards={0}
        mode="normal"
        setMode={() => { /* No use mode in verbs */ }}
        setTaskType={() => { /* No use taskType in verbs */ }}
        taskType="text"
      />
      {
        isCompleted ? <CompleteScreen score={score} maxScore={factor * verbs.length} />
          : <VerbCard cardData={verbs[currentCard]} successHandler={successHandler} key={verbs[currentCard].v1}/>
      }
    </div>
  );
}
