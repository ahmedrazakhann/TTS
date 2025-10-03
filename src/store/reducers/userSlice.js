import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: null,
  setting: null,
  networkIssue: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail(state, actions) {
      state.userDetail = actions.payload;
    },
    setSetting(state, actions) {
      state.setting = actions.payload;
    },
    setNetworkIssue(state, actions) {
      state.networkIssue = actions.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUserDetail, setSetting, setNetworkIssue } = userSlice.actions;
