import axiosClient from "./axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllMotels = () => {
    return axiosClient.get('/motel');
}

const getAllMyMotels = async () => {
    let owner = await AsyncStorage.getItem('owner')
    owner = owner.substring(1, owner.length - 1)
    return axiosClient.get('/motel', { 
        params: {
            owner: owner
        }
    });
}

const myNewMotelInfo = (motel) => {
    return axiosClient.post('/motel', motel);
}

const myNewMotelImages = (_id, images) => {
    return axiosClient.post(`/motel/${_id}/upload-image`, images, {
        headers: {
            'content-type': 'multipart/form-data',
        }
    });
}

const editMyMotelInfo = (motel, _id) => {
    return axiosClient.put(`/motel/${_id}`, motel);
}

const deleteMyMotel = (_id) => {
    return axiosClient.delete(`/motel/${_id}`);
}

const myMotelApi = {
    getAllMyMotels,
    myNewMotelInfo,
    myNewMotelImages,
    deleteMyMotel,
    getAllMotels,
    editMyMotelInfo
}
    
export default myMotelApi;