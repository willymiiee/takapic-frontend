export const userInitProfile = (
  state = { isUploadingPhotoProfile: false, isUploadingPhoneNumber: false },
  action
) => {
  switch (action.type) {
    case 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_START':
      return { ...state, isUploadingPhotoProfile: true };
    case 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_SUCCESS':
      return {
        ...state,
        isUploadingPhotoProfile: false,
        downloadURL: action.payload,
      };
    case 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_ERROR':
      return { ...state, isUploadingPhotoProfile: false, ...action.payload };
    default:
      return state;
  }
};
