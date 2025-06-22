import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard.tsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/firebbase.ts";
import "./TaskScreen.css";

type TWordData = {
  title: string;
  translate: string;
};

export function TaskScreen() {
  const [currentCard, setCurrentCard] = useState(0);
  const [words, setWords] = useState<TWordData[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const snapshot = await getDocs(collection(db, 'words'));
      const data = snapshot.docs.map(doc => ({ ...doc.data() })) as TWordData[];
      setWords(shuffleData(data));
    };
    fetchWords();
  }, []);

  function successHandler() {
    if (currentCard < words.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  }
  function restartHandler() {
    setCurrentCard(0);
    setWords(shuffleData(words));
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
      <div className="btn btn-primary m-2" onClick={restartHandler}>Restart</div>
      <TaskCard cardData={words[currentCard]} successHandler={successHandler} key={words[currentCard].title}/>
    </>
  );
}
