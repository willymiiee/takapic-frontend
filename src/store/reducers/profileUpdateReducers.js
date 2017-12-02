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
    case 'UPDATE_PHOTOS_PORTOFOLIO':
      return { loading: true, loaded: false };
    case 'UPLOAD_IMAGE_PHOTOS_PORTFOLIO':
      return {
        percentages: action.percentages,
      };
    case 'UPDATE_PHOTOS_PORTOFOLIO_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PHOTOS_PORTOFOLIO_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_PROFILE_PACKAGES_PRICE':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_PACKAGES_PRICE_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_PACKAGES_PRICE_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'UPDATE_ACTIVE_TAB':
      return { ...state, activeTab: action.payload }
    default:
      return state;
  }
};

export default profileUpdate;
