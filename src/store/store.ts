
import { configureStore } from "@reduxjs/toolkit";
import orgReducer from "./orgSlice";

export const store = configureStore({
  reducer: {
    org: orgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;