import type { User } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

type TThemeData = "light" | "dark";

type TAppData = {
  user: User | null,
  table: string,
  theme: TThemeData,
}

const initialState: TAppData = {
  user: null,
  table: "words-v2",
  theme: "dark",
};

const counterSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User | null }) => {
      state.user = action.payload;
    },
    setTable: (state, action: { payload: string }) => {
      state.table = action.payload;
    },
    setTheme: (state, action: { payload: TThemeData }) => {
      state.theme = action.payload;
    },
  },
});

export const { setUser, setTheme, setTable } = counterSlice.actions;
export default counterSlice.reducer;