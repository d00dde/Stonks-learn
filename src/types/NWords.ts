export namespace NWords {
  export type TStatus = "mainTask" | "repeat" | "done";

  export type TMode = "normal" | "reverse";
  export type TTaskType = "text" | "voice";

  export type TWordStatus = "new" | "learn" | "skip" | "known";

  export type TWordDbData = {
    id: string;
    word: string;
    translation: string;
    statusA: TWordStatus;
    statusB: TWordStatus;
    learnedAtA: number | null;
    learnedAtB: number | null;
  };

  export type TWordData = Omit<TWordDbData, "id">;
}