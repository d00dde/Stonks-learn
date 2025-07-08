export namespace NWords {
  export type TStatus = "mainTask" | "repeat" | "done";

  export type TWordDbData = {
    id: string;
    title: string;
    translate: string;
  };

  export type TWordData = Omit<TWordDbData, "id">;
}