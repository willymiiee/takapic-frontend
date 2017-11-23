const initialState = {
  loading: false,
  loaded: false
};

const profileUpdate = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT':
      return { loading: true, loaded: false };
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'UPDATE_PROFILE_CAMERA_EQUIPMENT_ERROR':
      return { loading: false, loaded: true, error: action.error };
    default:
      return state;
  }
};

export default profileUpdate;
