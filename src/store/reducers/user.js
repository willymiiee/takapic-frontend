const user = (state = false, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGOUT_SUCCESS":
      return false;
    default:
      return state;
  }
};

export default user;
