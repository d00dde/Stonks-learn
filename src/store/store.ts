import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts";

export const store = configureStore({
  reducer: {
    appData: appReducer,
  },
});

// Типы RootState и AppDispatch для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;