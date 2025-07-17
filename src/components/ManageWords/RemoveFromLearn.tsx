import { useState, useEffect, useCallback } from "react";
import {collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { type NWords } from "../../types/NWords.ts";
import { Spinner } from "../../elements/Spinner.tsx";
import { SetWordCard } from "../SetWordCard.tsx";
import { db } from "../../db/firebbase.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { getUserData } from "../../../config/userData.ts";

export function RemoveFromLearn() {
  const { user, table } = useAppSelector((state) => state.appData);
  const [words, setWords] = useState<NWords.TWordDbData[] | null>(null);

  const { status, learnedAt } = getUserData(user);
  const fetchNewWords = useCallback(async () => {
    const q = query(
      collection(db, table),
      where(status, "==", "learn")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as NWords.TWordDbData[];
    setWords(data);
  }, [table, status]);

  useEffect(() => {
    fetchNewWords();
  }, [fetchNewWords]);

  async function updateWordStatus(wordId: string, status: NWords.TWordStatus) {
    await updateDoc(doc(db, table, wordId), {
      statusA: status,
      [learnedAt]: status === "learn" ? Date.now() : null,
    });
    await fetchNewWords();
  }

  if (words === null) {
    return <Spinner />;
  }

  if (words.length === 0) {
    return (<div>No items</div>);
  }

  return (
    <>
      <div className="m-1">Words in learn: {words.length}</div>
      <div className="d-flex flex-column align-items-center">
        {words.map((word) =>
          <SetWordCard
            word={word}
            updateWordStatus={updateWordStatus}
            status="learn"
            key={word.id}
            timeField={learnedAt}
          />)
        }
      </div>
    </>
  );
}
