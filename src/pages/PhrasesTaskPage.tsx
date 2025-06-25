import { TaskScreen } from "../components/TaskScreen/TaskScreen.tsx";
import { useAppSelector } from "../store/hooks.ts";
import { getUserData } from "../../config/users.ts";

export function PhrasesTaskPage() {
  const userName = useAppSelector((state) => state.appData.userName);
  return (
    <>
      <TaskScreen collectionName={getUserData(userName).phrases}/>
    </>
  );
}
