import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/userSlice";
import ttsConfig from "./reducers/ttsConfig";

const store = configureStore({
  reducer: { User, ttsConfig },
});

export const { dispatch, getState } = store;
export default store;
