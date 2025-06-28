export namespace NVerbs {
  export type TVerbDbData = {
    translate: string;
    v1: string;
    v2: string;
    v3: string;
    id: string;
  };

  export type TVerbData = Omit<TVerbDbData, "id">;

  export type TVerbForms = keyof Omit<TVerbData, "translate" >;
}