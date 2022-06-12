import axiosClient from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllMotels = async () => {
  return await axiosClient.get("/motel");
};

const getAllMyMotels = async () => {
  let owner = await AsyncStorage.getItem("owner");
  owner = owner.substring(1, owner.length - 1);
  return await axiosClient.get("/motel", {
    params: {
      owner: owner,
    },
  });
};

const myNewMotelInfo = async (motel) => {
  const response = await axiosClient.post("/motel", motel);
  return response._id;
};

const myNewMotelImages = async (_id, images) => {
  return await axiosClient.post(`/motel/${_id}/upload-image`, images, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

const editMyMotelInfo = async (motel, _id) => {
  return await axiosClient.put(`/motel/${_id}`, motel);
};

const editMyMotelImages = async (_id, images) => {
  console.log("editMyMotelImages", _id, images);
  return await axiosClient.put(`/motel/${_id}/update-image`, images, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

const deleteMyMotel = async (_id) => {
  return await axiosClient.delete(`/motel/${_id}`);
};

const myMotelApi = {
  getAllMyMotels,
  myNewMotelInfo,
  myNewMotelImages,
  deleteMyMotel,
  getAllMotels,
  editMyMotelInfo,
  editMyMotelImages,
};

export default myMotelApi;
