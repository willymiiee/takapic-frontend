const storeAuthDataToLocalStorage = authData => {
  localStorage.removeItem('initial_login_data');
  const data = {
    loggingIn: false,
    data: authData,
    error: null,
  };
  localStorage.setItem('initial_login_data', JSON.stringify(data));
};

export const userAuth = (state = { loggingIn: false }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return { ...state, loggingIn: true, data: null, error: null };
    case 'USER_LOGIN_SUCCESS':
    case 'USER_LOADING_AUTH':
      if (action.type === 'USER_LOGIN_SUCCESS') {
        storeAuthDataToLocalStorage(action.payload);
        return { ...state, loggingIn: false, data: action.payload };
      } else if (action.type === 'USER_LOADING_AUTH') {
        const initialLoginData = localStorage.getItem('initial_login_data');
        if (initialLoginData) {
          return JSON.parse(initialLoginData);
        }
      }
      return state;
    case 'USER_LOGIN_ERROR':
      return { ...state, loggingIn: false, data: null, error: action.payload };
    case 'USER_LOGOUT_SUCCESS':
      localStorage.removeItem('initial_login_data');
      return { loggingIn: false };
    default:
      return state;
  }
};

export const userSignup = (state = { signingUp: false }, action) => {
  switch (action.type) {
    case 'PHOTOGRAPHER_SIGNUP_START':
      return { signingUp: true };
    case 'PHOTOGRAPHER_SIGNUP_SUCCESS':
    case 'PHOTOGRAPHER_SIGNUP_ERROR':
      return { signingUp: false, ...action.payload };
    default:
      return state;
  }
};
