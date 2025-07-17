import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { type NWords } from "../../types/NWords.ts";
import { Spinner } from "../../elements/Spinner.tsx";
import { db } from "../../db/firebbase.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { getUserData } from "../../../config/userData.ts";

type TWordsStats = {
  new: NWords.TWordDbData[];
  learn: NWords.TWordDbData[];
  skipped: NWords.TWordDbData[];
  known: NWords.TWordDbData[];
}

export function Stats() {
  const { user, table } = useAppSelector((state) => state.appData);
  const [stats, setStats] = useState<TWordsStats | null>(null);

  const fetchNewWords = useCallback(async () => {
    const { status } = getUserData(user);
    const snapshot = await getDocs(collection(db, table));
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as NWords.TWordDbData[];
    setStats({
      new: data.filter(word => word[status] === "new"),
      learn: data.filter(word => word[status] === "learn"),
      skipped: data.filter(word => word[status] === "skip"),
      known: data.filter(word => word[status] === "known"),
    });
  }, [table, user]);

  useEffect(() => {
    fetchNewWords();
  }, [fetchNewWords]);

  if (stats === null) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div>New: {stats.new.length}</div>
      <div>Learn: {stats.learn.length}</div>
      <div>Skipped: {stats.skipped.length}</div>
      <div>Known: {stats.known.length}</div>
    </div>
  );
}
