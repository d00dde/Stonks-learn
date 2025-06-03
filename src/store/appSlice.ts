import { createSlice } from "@reduxjs/toolkit";

export type TUserData = {
  name: string,
} | null;

type TThemeData = "light" | "dark";

type TAppData = {
  user: TUserData,
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
    setUser: (state, action: { payload: TUserData }) => {
      state.user = action.payload;
    },
    setTheme: (state, action: { payload: TThemeData }) => {
      state.theme = action.payload;
    },
  },
});

export const { setUser, setTheme } = counterSlice.actions;
export default counterSlice.reducer;