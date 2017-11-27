const initialState = {
  loading: true,
  loaded: false,
  activeTab: 1,
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
    case 'UPDATE_ACTIVE_TAB':
      return { ...state, activeTab: action.payload }
    default:
      return state;
  }
};

export default profileUpdate;
