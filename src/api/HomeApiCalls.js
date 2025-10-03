import {
  setAudios,
  setFormats,
  setLanguages,
  setVoices,
} from "@/store/reducers/ttsConfig";
import { dispatch } from "@/store/store";
import { sleep } from "@/utils/helpers";

const formatter = async (formats) => {
  return formats.map((format) => ({
    value: format.value,
    label: format.label,
  }));
};

const audioFormatter = (audios) => {
  return audios.map((audio) => ({
    id: audio.id,
    title: audio.title,
    text: audio.text,
    voice: audio.voice,
    duration: audio.duration,
    format: audio.format,
    date: audio.date,
  }));
};

export const getVoices = async () => {
  await sleep(800);
  try {
    const response = [
      { value: "alloy", label: "Alloy - Natural & Balanced" },
      { value: "echo", label: "Echo - Clear & Professional" },
      { value: "fable", label: "Fable - Warm & Engaging" },
      { value: "onyx", label: "Onyx - Deep & Authoritative" },
      { value: "nova", label: "Nova - Energetic & Bright" },
      { value: "shimmer", label: "Shimmer - Soft & Gentle" },
    ];

    const formatted = await formatter(response);
    dispatch(setVoices(formatted));
  } catch (error) {
    console.error("Error fetching voices:", error);
  }
};

export const getLanguages = async () => {
  await sleep(400);
  try {
    const response = [
      { value: "en-US", label: "English (US)" },
      { value: "en-GB", label: "English (UK)" },
      { value: "es-ES", label: "Spanish" },
      { value: "fr-FR", label: "French" },
      { value: "de-DE", label: "German" },
      { value: "it-IT", label: "Italian" },
      { value: "pt-BR", label: "Portuguese" },
      { value: "ja-JP", label: "Japanese" },
      { value: "ko-KR", label: "Korean" },
      { value: "zh-CN", label: "Chinese" },
    ];

    const formatted = await formatter(response);
    dispatch(setLanguages(formatted));
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

export const getVoiceFormats = async () => {
  await sleep(200);
  try {
    const response = [
      { value: "mp3", label: "MP3 - Standard Quality" },
      { value: "wav", label: "WAV - High Quality" },
      { value: "ogg", label: "OGG - Compressed" },
      { value: "flac", label: "FLAC - Lossless" },
    ];

    const formatted = await formatter(response);
    dispatch(setFormats(formatted));
  } catch (error) {
    console.error("Error fetching formats:", error);
  }
};

export const getAudios = async () => {
  await sleep(200);
  try {
    const response = [
      {
        id: 1,
        title: "Sample Audio 1",
        text: "This is the first sample audio text.",
        voice: "Alloy",
        duration: "1m",
        format: "mp3",
        date: "2025-10-03 12:00:00",
      },
      {
        id: 2,
        title: "Sample Audio 2",
        text: "This is the second sample audio text.",
        voice: "Echo",
        duration: "2m",
        format: "mp3",
        date: "2025-10-03 12:05:00",
      },
      {
        id: 3,
        title: "Sample Audio 3",
        text: "This is the third sample audio text.",
        voice: "Fable",
        duration: "3m",
        format: "mp3",
        date: "2025-10-03 12:10:00",
      },
    ];

    const formatted = await audioFormatter(response);
    dispatch(setAudios(formatted));
  } catch (error) {
    console.error("Error fetching formats:", error);
  }
};
