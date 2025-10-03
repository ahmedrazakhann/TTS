import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/userSlice";

const store = configureStore({
  reducer: { User },
});

export const { dispatch, getState } = store;
export default store;
