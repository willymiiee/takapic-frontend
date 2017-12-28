const profileUpdate = (state = { loading: false, activeTab: 1 }, action) => {
  if (action.type === 'PROFILE_MANAGER_UPDATING_START') {
    return { ...state, loading: true };
  } else if (action.type === 'PROFILE_MANAGER_UPDATING_SUCCESS') {
    return { ...state, loading: false };
  } else if (action.type === 'UPDATE_ACTIVE_TAB') {
    return { ...state, activeTab: action.payload };
  }
  return state;
};

export default profileUpdate;
