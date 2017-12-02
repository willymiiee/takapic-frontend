const initialState = {
  loading: false,
  loaded: false
};

const photographerServiceInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'BECOME_OUR_PHOTOGRAPHER_PLACES_CHANGED':
      return { ...state, location: action.payload };
    case 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO':
      return { ...state, ...action.payload };
    case 'SUBMIT_CAMERA_EQUIPMENT':
      return { loading: true, loaded: false };
    case 'SUBMIT_CAMERA_EQUIPMENT_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, ...action.payload };
    case 'SUBMIT_CAMERA_EQUIPMENT_ERROR':
      return { loading: false, loaded: true, error: action.error };
    case 'SUBMIT_MEETING_POINT':
      return { loading: true, loaded: false };
    case 'SUBMIT_MEETING_POINT_SUCCESS':
      delete state.error;
      return { ...state, loading: false, loaded: true, data: action.payload };
    case 'SUBMIT_MEETING_POINT_ERROR':
      return { loading: false, loaded: true, error: action.payload };
    default:
      return state;
  }
};

export default photographerServiceInfo;
