import type { User } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

type TThemeData = "light" | "dark";

type TAppData = {
  user: User | null,
  theme: TThemeData,
}

const initialState: TAppData = {
  user: null,
  theme: "dark",
};

const counterSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User | null }) => {
      state.user = action.payload;
    },
    setTheme: (state, action: { payload: TThemeData }) => {
      state.theme = action.payload;
    },
  },
});

export const { setUser, setTheme } = counterSlice.actions;
export default counterSlice.reducer;