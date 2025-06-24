import { Routes, Route } from "react-router-dom";
import { WordsTaskPage } from "../pages/WordsTaskPage.tsx";
import { PhrasesTaskPage } from "../pages/PhrasesTaskPage.tsx";
import { SetWordsPage } from "../pages/SetWordsPage.tsx";
import { SetPhrasesPage } from "../pages/SetPhrasesPage.tsx";

export const pages = {
  WORDS: { title: "Words", to: "/", component: WordsTaskPage },
  PHRASES: { title: "Phrases", to: "/phrases", component: PhrasesTaskPage },
  SET_WORDS: { title: "Set words", to: "/set-words", component: SetWordsPage },
  SET_PHRASES: { title: "Set phrases", to: "/set-phrases", component: SetPhrasesPage },
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