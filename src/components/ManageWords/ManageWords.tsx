import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from "../../db/firebbase.ts";
import "./ManageWords.css";

type TWordData = {
  title: string;
  translate: string;
  id: string;
};

type TProps = {
  collectionName: string,
}

export function ManageWords({ collectionName }: TProps) {
  const [words, setWords] = useState<TWordData[]>([]);
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [draftTranslate, setDraftTranslate] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  async function fetchWords () {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TWordData[];
    setWords(data);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const filteredWords = useMemo(() => {
    return words.filter(word =>
      word.title.toLowerCase().includes(filter.toLowerCase()) ||
      word.translate.toLowerCase().includes(filter.toLowerCase())
    );
  }, [words, filter]);

  async function addWord() {
    await addDoc(collection(db, collectionName), {
      title: draftTitle,
      translate: draftTranslate,
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
    return <div className="loading">Loading...</div>;
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
          <li key={word.title} className="d-flex w-100 p-2 m-2 justify-content-between">
            <div className="h3">{word.title} - {word.translate}</div>
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
          placeholder="Enter word title"
        />
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftTranslate(e.target.value)}
          value={draftTranslate}
          placeholder="Enter word translation"
        />
        <div className="btn btn-success m-2" onClick={addWord}>Add</div>
      </div>
    </div>
  );
}
