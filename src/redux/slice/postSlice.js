import { createSlice } from "@reduxjs/toolkit";
import { ROOM_TYPE } from "../../Constants/filter";

const initialState = {
  post: [],
  searchPost: null,
  locationSearchText: "",
  favoritePost: [],
  roomType: 0,
  sortType: 0,
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    getListPost: (state, action) => {
      state.post = action.payload;
    },
    getListSearchPost: (state, action) => {
      state.searchPost = action.payload;
    },
    getLocationSearchPost: (state, action) => {
      state.locationSearchText = action.payload;
      state.searchPost = state.post.filter((element, index) =>
        element.address.includes(action.payload)
      );
    },
    getFavoritePost: (state, action) => {
      let listFavorite = [];
      for (let item of action.payload) {
        listFavorite.push(state.post.find((element) => element._id === item));
      }
      state.favoritePost = listFavorite;
    },
    getSearchFilteredPost: (state, action) => {
      console.log(action.payload);
      let newArr = [...state.post];
      newArr = newArr.filter((element, index) =>
        element.address.includes(state.locationSearchText)
      );
      if(action.payload.roomType !== 0){
        newArr = newArr.filter(
          (element, index) => element.roomType === action.payload.roomType
        );
      }
      if(action.payload.minPrice !== 0 && action.payload.maxPrice !== 0){
        newArr = newArr.filter(
          (element, index) =>
            action.payload.minPrice <= element.rentalPrice &&
            element.rentalPrice <= action.payload.maxPrice
        );
      }
      if(action.payload.minArea !== 0 && action.payload.maxArea !== 0){
        newArr = newArr.filter(
          (element, index) =>
            action.payload.minArea <= element.area &&
            element.area <= action.payload.maxArea
        );
      }
      if (action.payload.sortType === 2) {
        newArr.sort((a, b) => a.rentalPrice - b.rentalPrice);
      }
      if (action.payload.sortType === 1) {
        newArr.sort((a, b) => b.rentalPrice - a.rentalPrice);
      }
      if (action.payload.sortType === 0) {
        newArr.sort((a, b) => {
          var dateA = new Date(a.createdAt).getTime();
          var dateB = new Date(b.createAt).getTime();
          return dateB - dateA;
        });
      }
      state.searchPost = newArr;
      state.roomType = action.payload.roomType;
      state.sortType = action.payload.sortType;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.minArea = action.payload.minArea;
      state.maxArea = action.payload.maxArea;
    },
    resetFilter: (state, action) => {
      state.searchPost = null;
      state.roomType = 0;
      state.sortType = 0;
      state.minPrice = "";
      state.maxPrice = "";
      state.minArea = "";
      state.maxArea = "";
    },
    resetSearchPost: (state, action) => {
      state.searchPost = null;
    },
  },
});
