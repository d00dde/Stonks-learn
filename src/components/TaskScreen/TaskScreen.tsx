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

type TWordData = NWords.TWordData & {
  score: number,
  complete: boolean,
};

export function TaskScreen({ collectionName }: TProps) {
  const factor = 2;
  const userName = useAppSelector((state) => state.appData.userName);
  const [currentCard, setCurrentCard] = useState(0);
  const [status, setStatus] = useState<NWords.TStatus>("mainTask");
  const [words, setWords] = useState<TWordData[]>([]);
  const [repeats, setRepeats] = useState<TWordData[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        score: 0,
        complete: false,
      })) as TWordData[];
      setWords(shuffleData(data));
    };
    fetchWords();
  }, [collectionName, userName]);

  function successHandler(cardScore: number) {
    if (cardScore > 0) {
      if (status === "mainTask") {
        setWords((prev) => {
          const updatedWords = [...prev];
          updatedWords[currentCard].score = cardScore;
          updatedWords[currentCard].complete = true;
          return updatedWords;
        });
      }
      else {
        setRepeats((prev) => {
          const updatedWords = [...prev];
          updatedWords[currentCard].complete = true;
          return updatedWords;
        });
      }
    }
    const mistakes = status === "mainTask"
      ? words.filter(word => !word.complete).length
      : repeats.filter(word => !word.complete).length;
    switch (status) {
      case "mainTask":
        if (currentCard < words.length - 1) {
          return setCurrentCard(currentCard + 1);
        }
        if (mistakes === 0) {
          new Audio(completeTask).play();
          return setStatus("done");
        }
        setCurrentCard(0);
        setRepeats(words.filter(word => !word.complete));
        return setStatus("repeat");
      case "repeat":
        if (currentCard < repeats.length - 1) {
          return setCurrentCard(currentCard + 1);
        }
        if (mistakes === 0) {
          new Audio(completeTask).play();
          return setStatus("done");
        }
        setRepeats(words.filter(word => !word.complete));
        setCurrentCard(0);
    }
  }

  function restartHandler() {
    setCurrentCard(0);
    setStatus("mainTask");
    setWords((prev) => {
      prev.forEach(word => {
        word.score = 0;
        word.complete = false;
      });
      return shuffleData(prev);
    });
    setRepeats([]);
  }

  function shuffleData<T>(data: T[]) {
    return data.map((item: T) => item).sort(() => Math.random() - 0.5);
  }

  if (words.length === 0) {
    return <Spinner />;
  }

  const score = words.reduce((acc, word) => acc + word.score, 0);
  const displayWords = status === "repeat" ? repeats : words;

  return (
    <div className="container-fluid container align-items-end">
      <TaskControl
        score={score}
        factor={factor}
        currentCard={currentCard}
        cardCount={words.length}
        restartHandler={restartHandler}
        status={status}
        repeatCards={repeats.length}
      />
      {
        status === "done" ? <CompleteScreen score={score} maxScore={words.length * factor} />
          : <TaskCard cardData={displayWords[currentCard]} successHandler={successHandler} key={Date.now()}/>
      }
    </div>
  );
}
