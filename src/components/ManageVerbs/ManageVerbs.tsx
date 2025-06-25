import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from "../../db/firebbase.ts";
import "./ManageVerbs.css";

type TVerbData = {
  v1: string;
  v2: string;
  v3: string;
  id: string;
};

type TProps = {
  collectionName: string,
}

export function ManageVerbs({ collectionName }: TProps) {
  const [verbs, setVerbs] = useState<TVerbData[]>([]);
  const [draftV1, setDraftV1] = useState<string>("");
  const [draftV2, setDraftV2] = useState<string>("");
  const [draftV3, setDraftV3] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  async function fetchVerbs () {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TVerbData[];
    setVerbs(data);
  }

  useEffect(() => {
    fetchVerbs();
  }, []);

  const filteredVerbs = useMemo(() => {
    return verbs.filter(verb =>
      verb.v1.toLowerCase().includes(filter.toLowerCase()) ||
      verb.v2.toLowerCase().includes(filter.toLowerCase()) ||
      verb.v3.toLowerCase().includes(filter.toLowerCase())
    );
  }, [verbs, filter]);

  async function addVerb() {
    await addDoc(collection(db, collectionName), {
      v1: draftV1,
      v2: draftV2,
      v3: draftV3,
    });
    setDraftV1("");
    setDraftV2("");
    setDraftV3("");
    await fetchVerbs();
  }

  async function deleteVerb(id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id));
      console.log(`Документ с ID ${id} удалён`);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
    await fetchVerbs();
  }

  if (verbs.length === 0) {
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
        {filteredVerbs.map((verb) => (
          <li key={verb.v1} className="d-flex w-100 p-2 m-2 justify-content-between">
            <div className="h3">{verb.v1} - {verb.v2} - {verb.v3}</div>
            <div className="btn btn-danger h-25" onClick={() => deleteVerb(verb.id)}><FontAwesomeIcon icon={faXmark}/></div>
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column mt-2 w-50">
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftV1(e.target.value)}
          value={draftV1}
          placeholder="Enter V1 form of verb"
        />
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftV2(e.target.value)}
          value={draftV2}
          placeholder="Enter V2 form of verb"
        />
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftV3(e.target.value)}
          value={draftV3}
          placeholder="Enter V3 form of verb"
        />
        <div className="btn btn-success m-2" onClick={addVerb}>Add</div>
      </div>
    </div>
  );
}
