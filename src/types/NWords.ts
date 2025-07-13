export namespace NWords {
  export type TStatus = "mainTask" | "repeat" | "done";

  export type TMode = "normal" | "reverse";
  export type TTaskType = "text" | "voice";

  export type TWordDbData = {
    id: string;
    title: string;
    translate: string;
  };

  export type TWordData = Omit<TWordDbData, "id">;
}