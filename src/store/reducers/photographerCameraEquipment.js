const submitCameraEquipment = (state = { signingUp: false }, action) => {
  switch (action.type) {
    case 'SUBMIT_CAMERA_EQUIPMENT':
      return { loading: true, loaded: false };
    case 'SUBMIT_CAMERA_EQUIPMENT_SUCCESS':
      delete state.error;
      return { loading: false, loaded: true, data: action.payload };
    case 'SUBMIT_CAMERA_EQUIPMENT_ERROR':
      delete state.data;
      return { signingUp: false, error: action.payload };
    default:
      return state;
  }
};

export default submitCameraEquipment;
