const storeAuthDataToLocalStorage = authData => {
  localStorage.removeItem('initial_login_data');
  localStorage.setItem('initial_login_data', JSON.stringify(authData));
};

export const userAuth = (state = {}, action) => {
  switch (action.type) {
    case 'USER_AUTH_LOGIN_START':
      return { ...state };

    case 'USER_AUTH_LOGIN_SUCCESS':
      const providerData = action.payload.providerData[0];
      const newData1 = {
        uid: action.payload.uid,
        email:
          providerData.providerId === 'facebook.com'
            ? providerData.email
            : action.payload.email,
        emailVerified: action.payload.emailVerified,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        providerId: providerData.providerId,
        refreshToken: action.payload.refreshToken,
        userCurrency: 'NZD',
      };
      storeAuthDataToLocalStorage(newData1);
      return newData1;

    case 'USER_AUTH_LOGIN_SUCCESS_FETCH_USER_METADATA':
      const newData2 = { ...state, userMetadata: action.payload };
      storeAuthDataToLocalStorage(newData2);
      return newData2;

    case 'USER_AUTH_LOADING_AUTH':
      const initialLoginData = localStorage.getItem('initial_login_data');
      if (initialLoginData !== 'undefined' && initialLoginData !== null) {
        return JSON.parse(initialLoginData);
      }
      return state;

    case 'USER_AUTH_UPDATE_PROFILE':
      return { ...state, ...action.payload };

    case 'USER_AUTH_UPDATE_METADATA':
      const newMetadata = { ...state.userMetadata, ...action.payload };
      return { ...state, userMetadata: newMetadata };

    case 'USER_AUTH_LOGIN_ERROR':
      return { ...state, error: action.payload };

    case 'USER_AUTH_LOGOUT_SUCCESS':
      localStorage.removeItem('initial_login_data');
      return {};

    default:
      return state;
  }
};

export const userSignup = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGNUP_SUCCESS':
    case 'USER_SIGNUP_ERROR':
      return { ...action.payload };
    default:
      return state;
  }
};
