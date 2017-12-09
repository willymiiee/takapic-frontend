const initialState = {
  loading: false,
  loaded: false,
  activeTab: 1,
  percentages: [],
};

const profileUpdate = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_BASIC_INFORMATION':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_BASIC_INFORMATION_USER_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_BASIC_INFORMATION_USER_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_PROFILE_MEETING_POINT':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_MEETING_POINT_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_MEETING_POINT_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO':
      return { loading: true, loaded: false };
    case 'PROFILE_MANAGER_UPLOAD_IMAGE_PHOTOS_PORTOFOLIO':
      return {
        percentages: action.percentages,
      };
    case 'PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_PROFILE_PACKAGES_PRICE':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_PACKAGES_PRICE_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_PACKAGES_PRICE_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_START':
      return { ...state, loading: true };
    case 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_SUCCESS':
    case 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_ERROR':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default profileUpdate;
