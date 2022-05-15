import axiosClient from "./axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';

const signUp = async (user) => {
    axiosClient.post('/user/register', user);
}

const signIn = async (user) => {
    return axiosClient.post('/user/login', user)
    .then((response) => {
        if (response.jwt) {
            AsyncStorage.setItem("user", JSON.stringify(response));
            AsyncStorage.setItem("token", JSON.stringify(response.jwt));
            AsyncStorage.setItem("owner", JSON.stringify(response.user._id));
            AsyncStorage.setItem("name", JSON.stringify(response.user.name));
            AsyncStorage.setItem("phone", JSON.stringify(response.user.phone));
        }
        return response;
    });
}

const signOut = async () => {
    AsyncStorage.removeItem("user");
};

const userApi = {
    signUp,
    signIn,
    signOut
}
    
export default userApi;