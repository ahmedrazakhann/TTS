import { config } from "@/config/config";
import moment from "moment/moment";

export const getFormattedDate = (isoDate) => {
  const momentObj = moment(isoDate);

  if (momentObj.isValid()) {
    return momentObj.format(config.dateFormat);
  }
  return "";
};

export const setItemInLocalStorage = (key, value, isStringify = true) => {
  localStorage.setItem(key, isStringify ? JSON.stringify(value) : value);
};

export const getLocalStorageItem = (
  key,
  defaultValue = null,
  isParse = true
) => {
  try {
    const value = localStorage.getItem(key);
    return (isParse ? JSON.parse(value) : value) ?? defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.href = `${window.location.origin}/sign-in`;
};
export const handleErrorMessages = (errors) => {
  let message = "Oops! Something went wrong.";

  if (Array.isArray(errors)) {
    if (errors[0]?.message && Array.isArray(errors[0].message)) {
      message = errors[0].message
        .map(
          (e) => `${e.field ? `${e.field}: ` : ""}${e.data || e.message || ""}`
        )
        .join("\n");
    } else {
      message = errors
        .map(
          (e) => `${e.field ? `${e.field}: ` : ""}${e.data || e.message || ""}`
        )
        .join("\n");
    }
  } else if (errors && typeof errors === "object") {
    if (Array.isArray(errors.errors)) {
      message = errors.errors
        .map(
          (e) => `${e.field ? `${e.field}: ` : ""}${e.message || e.data || ""}`
        )
        .join("\n");
    } else if (typeof errors.message === "string") {
      message = errors.message;
    }
  }
  return message; // ✅ Fix: actually use the variable
};
