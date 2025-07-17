import { Routes, Route } from "react-router-dom";
import { WordsTaskPage } from "../pages/WordsTaskPage.tsx";
import { SetWordsPage } from "../pages/SetWordsPage.tsx";
import { AddWordsPage } from "../pages/AddWordsPage.tsx";
import { SetVerbsPage } from "../pages/SetVerbsPage.tsx";
import { VerbsTaskPage } from "../pages/VerbsTaskPage.tsx";

export const pages = {
  WORDS: { title: "Learn words", to: "/", component: WordsTaskPage },
  VERBS: { title: "Learn verbs", to: "/verbs", component: VerbsTaskPage },
  SET_WORDS: { title: "Set words", to: "/set-words", component: SetWordsPage },
  ADD_WORDS: { title: "Add words", to: "/add-words", component: AddWordsPage },
  SET_VERBS: { title: "Set verbs", to: "/set-verbs", component: SetVerbsPage },
};

export function Router() {
  return (
    <Routes>
      {Object.entries(pages).map(([key, { to, component: Component }]) => (
        <Route key={key} path={to} element={<Component />} />
      ))}
      <Route path="*" element={<WordsTaskPage />} />
    </Routes>
  );
}