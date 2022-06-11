import axios from "axios";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
<<<<<<< HEAD
    baseURL: "https://mtapp-a.herokuapp.com/api/",
    headers: {
        'content-type': 'aplication/json',
    },
    paramsSerializer: params => queryString.stringify(params),
=======
  baseURL: "https://mtapp-a.herokuapp.com/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
>>>>>>> 4ec166b9066718a8880941a145bb28a4c9ef809c
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
