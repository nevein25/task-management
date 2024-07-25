import axios from "axios";
import { config } from "../common/constants";
import { parseJwt } from "./helper";

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        window.location.href = "/login";
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`;
}

export { instance, bearerAuth };