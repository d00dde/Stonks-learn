import { ManageWords } from "../components/ManageWords/ManageWords.tsx";
import { useAppSelector } from "../store/hooks.ts";
import { getUserData } from "../../config/users.ts";

export function SetWordsPage() {
  const userName = useAppSelector((state) => state.appData.userName);
  return (
    <>
      <ManageWords collectionName={getUserData(userName).words}/>
    </>
  );
}
