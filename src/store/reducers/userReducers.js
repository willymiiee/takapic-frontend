const storeAuthDataToLocalStorage = authData => {
  localStorage.removeItem('initial_login_data');
  localStorage.setItem('initial_login_data', JSON.stringify(authData));
};

export const userAuth = (
  state = { loggingIn: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return { ...state, loggingIn: true, data: null, error: null };

    case 'USER_LOGIN_SUCCESS':
      const newData1 = { ...state, data: action.payload };
      storeAuthDataToLocalStorage(newData1);
      return newData1;

    case 'USER_LOGIN_SUCCESS_FETCH_USER_METADATA':
      const newData2 = { ...state, metadata: action.payload };
      storeAuthDataToLocalStorage(newData2);
      return newData2;

    case 'USER_LOADING_AUTH':
      const initialLoginData = localStorage.getItem('initial_login_data');
      if (initialLoginData) {
        return JSON.parse(initialLoginData);
      }
      return state;

    case 'USER_LOGIN_ERROR':
      return { ...state, loggingIn: false, data: null, error: action.payload };

    case 'USER_LOGOUT_SUCCESS':
      localStorage.removeItem('initial_login_data');
      return { loggingIn: false, data: null, error: null };

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
