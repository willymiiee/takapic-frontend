const initialState = {
  isUploadingPhotoProfile: false,
  isUploadingPhoneNumber: false,
  file: null,
  imagePreviewUrl: '',
  notAvailableDates: []
};

export const userInitProfile = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_IMAGE_SELECTED':
      return { ...state, ...action.payload };

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

    case 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_START':
      return { ...state, isUploadingPhoneNumber: true };

    case 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_SUCCESS':
      return { ...state, isUploadingPhoneNumber: false };

    case 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_ERROR':
      return { ...state, isUploadingPhoneNumber: false, error: action.payload };

    case 'USER_INIT_PROFILE_SETUP_SCHEDULE_SUCCESS':
      return { ...state, notAvailableDates: action.payload };

    default:
      return state;
  }
};
