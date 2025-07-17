import { useState, useEffect, useMemo, useCallback } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { type NWords } from "../../types/NWords.ts";
import { Spinner } from "../../elements/Spinner.tsx";
import { db } from "../../db/firebbase.ts";
import "./ManageWords.css";

const collectionName = "words";

export function ManageWords() {
  const [words, setWords] = useState<NWords.TWordDbData[]>([]);
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [draftTranslate, setDraftTranslate] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const fetchWords = useCallback(async () => {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NWords.TWordDbData[];
    setWords(data);
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const filteredWords = useMemo(() => {
    return words.filter(word =>
      word.translation.toLowerCase().includes(filter.toLowerCase()) ||
      word.word.toLowerCase().includes(filter.toLowerCase())
    );
  }, [words, filter]);

  async function addWord() {
    await addDoc(collection(db, collectionName), {
      word: draftTitle,
      translation: draftTranslate,
    });
    setDraftTitle("");
    setDraftTranslate("");
    await fetchWords();
  }

  async function deleteWord(id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id));
      console.log(`Документ с ID ${id} удалён`);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
    await fetchWords();
  }

  if (words.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <input
        type="text"
        className="form-control w-50 m-2"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        placeholder="Filter words"
      />
      <ul className="words-list">
        {filteredWords.map((word) => (
          <li key={word.translation} className="d-flex w-90 p-2 m-2 justify-content-between align-items-center">
            <div className="h3 text-primary w-25">{word.translation}:</div>
            <div className="h3 text-success ">{word.word}</div>
            <div className="btn btn-danger h-25" onClick={() => deleteWord(word.id)}><FontAwesomeIcon icon={faXmark}/></div>
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column mt-2 w-50">
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftTitle(e.target.value)}
          value={draftTitle}
          placeholder="Enter english word"
        />
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftTranslate(e.target.value)}
          value={draftTranslate}
          placeholder="Enter translation"
        />
        <div className="btn btn-success m-2" onClick={addWord}>Add</div>
      </div>
    </div>
  );
}
