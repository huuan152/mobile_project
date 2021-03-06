export const addPostLocationScreenSelector = (state) =>
  state.addPost.locationScreen;
export const addPostInfoScreenSelector = (state) => state.addPost.infoScreen;
export const addPostImagesScreenSelector = (state) =>
  state.addPost.imagesScreen;
export const addPostConfirmScreenSelector = (state) =>
  state.addPost.confirmScreen;
export const addPostSelector = (state) => state.addPost.addPost;
export const addPostSearchSelector = (state) => state.addPost.search;
export const addPostThumbnailSelector = (state) => state.addPost.thumbnail;
export const addPostSendingStateSelector = (state) => state.addPost.sending;
export const addPostMessageSelector = (state) => state.addPost.message;
export const isCreated = (state) => state.addPost.createMotels;

export const postLocationScreenSelector = (state) =>
  state.updatePost.locationScreen;
export const postInfoScreenSelector = (state) => state.updatePost.infoScreen;
export const postImagesScreenSelector = (state) =>
  state.updatePost.imagesScreen;
export const postConfirmScreenSelector = (state) =>
  state.updatePost.confirmScreen;
export const postSelector = (state) => state.updatePost.post;
export const postSearchSelector = (state) => state.updatePost.search;
export const postThumbnailSelector = (state) => state.updatePost.thumbnail;
export const postSendingStateSelector = (state) => state.updatePost.sending;
export const postMessageSelector = (state) => state.updatePost.message;
export const isDeleted = (state) => state.updatePost.deleteMotels;
export const isUpdated = (state) => state.updatePost.updateMotels;
export const motelUpdateID = (state) => state.updatePost.motelUpdateID;

export const userSelector = (state) => state.user;
export const isLogIn = (state) => state.user.isLogIn;
export const userSendingStateSelector = (state) => state.user.sending;
export const favoriteMotels = (state) => state.user.user.favoriteMotels;

export const listPostSelector = (state) => state.post;
