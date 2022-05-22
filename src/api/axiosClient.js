import axios from "axios";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  baseURL: "https://mtapp-a.herokuapp.com/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization =
      "Bearer " + token.substring(1, token.length - 1);
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
