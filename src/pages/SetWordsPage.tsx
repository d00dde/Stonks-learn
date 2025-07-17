import { useState } from "react";
import { AddToLearn } from "../components/ManageWords/AddToLearn.tsx";
import { RemoveFromLearn } from "../components/ManageWords/RemoveFromLearn.tsx";
import { Stats } from "../components/ManageWords/Stats.tsx";

export function SetWordsPage() {
  const [tab, setTab] = useState<"addToLearn" | "removeFromLearn" | "stats">("addToLearn");
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "addToLearn" ? "active" : ""}`}
            onClick={() => setTab("addToLearn")}
            aria-current="page"
            href="#"
          >Add to learn</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "removeFromLearn" ? "active" : ""}`}
            onClick={() => setTab("removeFromLearn")}
            href="#"
          >Remove from learn</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "removeFromLearn" ? "active" : ""}`}
            onClick={() => setTab("stats")}
            href="#"
          >Stats</a>
        </li>
      </ul>
      {tab === "addToLearn" && <AddToLearn />}
      {tab === "removeFromLearn" && <RemoveFromLearn />}
      {tab === "stats" && <Stats />}
    </>
  );
}
