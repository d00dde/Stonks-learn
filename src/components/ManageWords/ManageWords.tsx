import {useState, useEffect } from "react";
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

export function ManageWords() {
  const [words, setWords] = useState<TWordData[]>([]);
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [draftTranslate, setDraftTranslate] = useState<string>("");

  async function fetchWords () {
    const snapshot = await getDocs(collection(db, 'words'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TWordData[];
    setWords(data);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  async function addWord() {
    await addDoc(collection(db, 'words'), {
      title: draftTitle,
      translate: draftTranslate,
    });
    setDraftTitle("");
    setDraftTranslate("");
    await fetchWords();
  }

  async function deleteWord(id: string) {
    try {
      await deleteDoc(doc(db, 'words', id));
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
      <ul>
        {words.map((word) => (
          <li key={word.title} className="d-flex w-100 m-2 justify-content-between">
            <div className="h3">{word.title} - {word.translate}</div>
            <div className="btn btn-danger" onClick={() => deleteWord(word.id)}><FontAwesomeIcon icon={faXmark}/></div>
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
