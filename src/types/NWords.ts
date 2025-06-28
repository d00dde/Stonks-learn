export namespace NWords {
  export type TWordDbData = {
    id: string;
    title: string;
    translate: string;
  };

  export type TWordData = Omit<TWordDbData, "id">;
}