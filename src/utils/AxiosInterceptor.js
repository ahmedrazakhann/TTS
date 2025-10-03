import axios from "axios";
import { config } from "@/config/config";
import { getLocalStorageItem, handleLogout } from "./helpers";
import toast from "react-hot-toast";

const AxiosInterceptor = {
  initialize: () => {
    axios.defaults.baseURL = config.backendUrl;

    axios.interceptors.request.use(
      (axiosConfig) => {
        const authToken = getLocalStorageItem({
          key: "authentication_token",
          isParse: false,
        });
        if (authToken && !axiosConfig.ignoreToken) {
          axiosConfig.headers["Authorization"] = `Bearer ${authToken}`;
        }
        if (!axiosConfig.rawHeader) {
          axiosConfig.headers["Content-Type"] = "application/json";
        }
        return axiosConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }

        if (error.response) {
          const { message, errors } = error.response.data;

          if (message) {
            toast.error(message);
          }

          if (errors && typeof errors === "object") {
            for (const [field, messages] of Object.entries(errors)) {
              if (Array.isArray(messages)) {
                messages.forEach((msg) => {
                  toast.error(`${field}: ${msg}`);
                });
              }
            }
          }
        }

        return Promise.reject(error);
      }
    );
  },
};

export default AxiosInterceptor;
