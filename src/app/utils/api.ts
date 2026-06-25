
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AccessTokenKey, BackendUrl } from "./Dotenv";

const BASE_URL =
  BackendUrl;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const accessToken =
        await SecureStore.getItemAsync(
          AccessTokenKey
        );

      if (
        accessToken &&
        config.headers
      ) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) =>
    Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    /*
    Refresh Token Logic Placeholder

    if (
      error.response?.status === 401
    ) {
      call refresh endpoint
      save new access token
      retry request
    }
    */

    return Promise.reject(error);
  }
);

export default api;

