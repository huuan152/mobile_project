import axiosClient from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signUp = async (user) => {
  return await axiosClient.post("/user/register", user);
};

const signIn = async (user) => {
  return await axiosClient.post("/user/login", user).then((response) => {
    if (response.jwt) {
      AsyncStorage.setItem("user", JSON.stringify(response));
      AsyncStorage.setItem("token", JSON.stringify(response.jwt));
      AsyncStorage.setItem("owner", JSON.stringify(response.user._id));
      AsyncStorage.setItem("name", JSON.stringify(response.user.name));
      AsyncStorage.setItem("phone", JSON.stringify(response.user.phone));
      AsyncStorage.setItem("favoriteAreas", JSON.stringify(response.user.favoriteAreas))
    }
    return response;
  });
};

const signOut = async () => {
  return await AsyncStorage.removeItem("user");
};

const toggleFavoriteMotel = async (_id) => {
  return await axiosClient.post(`/motel/${_id}/toggle-favorite`);
}

const getAllMyFavoriteMotels = async () => {
  return await axiosClient.get(`/motel/my-favorite`);
}

const userApi = {
  signUp,
  signIn,
  signOut,
  toggleFavoriteMotel,
  getAllMyFavoriteMotels
};

export default userApi;
