import type { User } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

type TThemeData = "light" | "dark";

type TAppData = {
  user: User | null,
  userName: string,
  theme: TThemeData,
}

const initialState: TAppData = {
  user: null,
  userName: "def",
  theme: "dark",
};

const counterSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User | null }) => {
      state.user = action.payload;
    },
    setUserName: (state, action: { payload: string }) => {
      state.userName = action.payload;
    },
    setTheme: (state, action: { payload: TThemeData }) => {
      state.theme = action.payload;
    },
  },
});

export const { setUser, setTheme, setUserName } = counterSlice.actions;
export default counterSlice.reducer;