// ttsConfigSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voices: null,
  languages: null,
  formats: null,
  audios: null,
};

const ttsConfigSlice = createSlice({
  name: "ttsConfig",
  initialState,
  reducers: {
    setVoices(state, action) {
      state.voices = action.payload;
    },
    setLanguages(state, action) {
      state.languages = action.payload;
    },
    setFormats(state, action) {
      state.formats = action.payload;
    },
    setAudios(state, action) {
      state.audios = action.payload;
    },
    resetTtsConfig(state) {
      state.voices = [];
      state.languages = [];
      state.formats = [];
    },
  },
});

export default ttsConfigSlice.reducer;

export const {
  setVoices,
  setLanguages,
  setFormats,
  resetTtsConfig,
  setAudios,
} = ttsConfigSlice.actions;
