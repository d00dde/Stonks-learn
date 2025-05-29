import { createSlice } from "@reduxjs/toolkit";

export type UserData = {
  name: string,
} | null;

const initialState: { user: UserData } = {
  user: null,
};

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: UserData, type: string }) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = counterSlice.actions;
export default counterSlice.reducer;