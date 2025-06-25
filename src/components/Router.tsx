import { Routes, Route } from "react-router-dom";
import { WordsTaskPage } from "../pages/WordsTaskPage.tsx";
import { PhrasesTaskPage } from "../pages/PhrasesTaskPage.tsx";
import { SetWordsPage } from "../pages/SetWordsPage.tsx";
import { SetPhrasesPage } from "../pages/SetPhrasesPage.tsx";
import { SetVerbsPage } from "../pages/SetVerbsPage.tsx";
import { VerbsTaskPage } from "../pages/VerbsTaskPage.tsx";

export const pages = {
  WORDS: { title: "Words", to: "/", component: WordsTaskPage },
  PHRASES: { title: "Phrases", to: "/phrases", component: PhrasesTaskPage },
  VERBS: { title: "Verbs", to: "/verbs", component: VerbsTaskPage },
  SET_WORDS: { title: "Set words", to: "/set-words", component: SetWordsPage },
  SET_PHRASES: { title: "Set phrases", to: "/set-phrases", component: SetPhrasesPage },
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