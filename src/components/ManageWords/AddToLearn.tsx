import { useState, useEffect, useCallback } from "react";
import { collection, query, where, limit, getDocs, doc, updateDoc, type QueryConstraint } from "firebase/firestore";
import { type NWords } from "../../types/NWords.ts";
import { SetWordCard } from "../SetWordCard.tsx";
import { Spinner } from "../../elements/Spinner.tsx";
import { db } from "../../db/firebbase.ts";
import { getUserData } from "../../../config/userData.ts";
import { useAppSelector } from "../../store/hooks.ts";


export function AddToLearn() {
  const { user, table } = useAppSelector((state) => state.appData);
  const [words, setWords] = useState<NWords.TWordDbData[] | null>(null);
  const [wordsStatus, setWordsStatus] = useState<NWords.TWordStatus>("new");
  const [search, setSearch] = useState<string>("");

  const { status, learnedAt } = getUserData(user);
  const fetchNewWords = useCallback(async () => {
    const filters: QueryConstraint[] = [
      where(status, "==", wordsStatus),
    ];
    if (search) {
      filters.push(where("word", "==", search));
    }
    if (wordsStatus === "new") {
      filters.push(limit(10));
    }
    const q = query(
      collection(db, table),
      ...filters,
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as NWords.TWordDbData[];
    setWords(data);
  }, [wordsStatus, search, table, status]);

  async function updateWordStatus(wordId: string, status: NWords.TWordStatus) {
    await updateDoc(doc(db, table, wordId), {
      statusA: status,
      [learnedAt]: status === "learn" ? Date.now() : null,
    });
    setWords((prevWords) => prevWords!.filter(word => word.id !== wordId));
  }

  useEffect(() => {
    fetchNewWords();
  }, [wordsStatus, table]);

  if (words === null) {
    return <Spinner />;
  }

  return (
    <>
      <div className="d-flex justify-content-around p-1">
        <div className="d-flex flex-column justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="wordsStatusNew"
              id="wordsStatusNew"
              checked={wordsStatus === "new"}
              onChange={() => setWordsStatus("new")}
            />
            <label className="form-check-label" htmlFor="wordsStatusNew">
              New words
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="wordsStatusSkip"
              id="wordsStatusSkip"
              checked={wordsStatus === "skip"}
              onChange={() => setWordsStatus("skip")}
            />
            <label className="form-check-label" htmlFor="wordsStatusSkip">
              Skipped words
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="wordsStatusKnown"
              id="wordsStatusKnown"
              checked={wordsStatus === "known"}
              onChange={() => setWordsStatus("known")}
            />
            <label className="form-check-label" htmlFor="wordsStatusKnown">
              Known words
            </label>
          </div>
        </div>
        { wordsStatus === "new"
          ? <input
            type="text"
            className="form-control m-1 h-25 w-50"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Enter word"
          />
          : <div className="align-self-center">Count: {words.length}</div>
        }
        <button onClick={fetchNewWords} className="btn btn-primary m-1 ">+ 10</button>
      </div>

      { words.length === 0
        ? <div>No items</div>
        : <div className="d-flex flex-column align-items-center">
          {words.map((word) =>
            <SetWordCard
              word={word}
              updateWordStatus={updateWordStatus}
              status={wordsStatus}
              key={word.id}
              timeField={learnedAt}
            />)
          }
        </div>
      }
    </>

  );
}
