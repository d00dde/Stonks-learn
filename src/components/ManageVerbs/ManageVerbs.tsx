import { useState, useEffect, useMemo, useCallback } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { type NVerbs } from "../../types/NVerbs.ts";
import { Spinner } from "../../elements/Spinner.tsx";
import { db } from "../../db/firebbase.ts";
import "./ManageVerbs.css";

type TProps = {
  collectionName: string,
}

export function ManageVerbs({ collectionName }: TProps) {
  const [verbs, setVerbs] = useState<NVerbs.TVerbDbData[]>([]);
  const [draftTranslate, setDraftTranslate] = useState<string>("");
  const [draftV1, setDraftV1] = useState<string>("");
  const [draftV2, setDraftV2] = useState<string>("");
  const [draftV3, setDraftV3] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const fetchVerbs = useCallback(async () => {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NVerbs.TVerbDbData[];
    setVerbs(data);
  }, [collectionName]);

  useEffect(() => {
    fetchVerbs();
  }, [fetchVerbs]);

  const filteredVerbs = useMemo(() => {
    return verbs.filter(verb =>
      verb.translate.toLowerCase().includes(filter.toLowerCase()) ||
      verb.v1.toLowerCase().includes(filter.toLowerCase()) ||
      verb.v2.toLowerCase().includes(filter.toLowerCase()) ||
      verb.v3.toLowerCase().includes(filter.toLowerCase())
    );
  }, [verbs, filter]);

  async function addVerb() {
    await addDoc(collection(db, collectionName), {
      translate: draftTranslate,
      v1: draftV1,
      v2: draftV2,
      v3: draftV3,
    });
    setDraftTranslate("");
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
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <input
        type="text"
        className="form-control w-50 m-2"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        placeholder="Filter verbs"
      />
      <ul className="verbs-list">
        {filteredVerbs.map((verb) => (
          <li key={verb.v1} className="d-flex w-90 p-2 m-2 justify-content-between align-items-center">
            <div className="h3 text-primary w-25">{verb.translate}:</div>
            <div className="h3 text-success ">{verb.v1} - {verb.v2} - {verb.v3}</div>
            <div className="btn btn-danger h-25" onClick={() => deleteVerb(verb.id)}><FontAwesomeIcon icon={faXmark}/></div>
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column mt-2 w-50">
        <input
          type="text"
          className="form-control m-2"
          onChange={(e) => setDraftTranslate(e.target.value)}
          value={draftTranslate}
          placeholder="Enter translate of verb"
        />
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
