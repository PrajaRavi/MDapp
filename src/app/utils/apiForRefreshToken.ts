
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { RefreshTokenKey, BackendUrl } from "./Dotenv";

const BASE_URL =
  BackendUrl;

const apiForRefreshToken = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type":
      "application/json",
  },
});

apiForRefreshToken.interceptors.request.use(
  async (config) => {
    try {
      const Refreshtoken =
        await SecureStore.getItemAsync(
          RefreshTokenKey
        );

      if (
        Refreshtoken &&
        config.headers
      ) {
        config.headers.Authorization = `Bearer ${Refreshtoken}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) =>
    Promise.reject(error)
);

apiForRefreshToken.interceptors.response.use(
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

export default apiForRefreshToken;

