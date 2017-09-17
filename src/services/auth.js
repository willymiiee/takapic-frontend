import history from 'services/history';
import Auth0Lock from 'auth0-lock';
import { WebAuth } from 'auth0-js';
import logo from 'img/logo.png';
import store from 'store';

const CLIENT_ID = 'zbQbMQuebPNi45I71U08vvdpcjHIeSbk';
const CLIENT_DOMAIN = 'takapic.au.auth0.com';

const auth0 = new WebAuth({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: window.location.origin,
  audience: 'https://takapic.au.auth0.com/userinfo',
  responseType: 'token',
  scope: 'openid',
});

const lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, {
  auth: {
    redirectUrl: window.location.origin,
    responseType: 'token',
  },
  theme: { logo, primaryColor: '#aaa' },
  additionalSignUpFields: [
    {
      name: 'name',
      placeholder: 'Enter your name',
      validator: function(name) {
        return {
          valid: Boolean(name),
          hint: 'Name is required', // optional
        };
      },
    },
    {
      name: 'phone',
      placeholder: 'Enter your phone number',
      validator: function(phone) {
        return {
          valid:
            String(phone).startsWith('+') &&
            Number.isInteger(Number(String(phone).substr(1))),
          hint: 'Must be a number that starts with +', // optional
        };
      },
    },
  ],
});

export const getProfile = authResult => {
  if (authResult.accessToken) {
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        store.dispatch({ type: 'LOGIN_ERROR' });
        return;
      }

      // Save token and profile locally
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      store.dispatch({ type: 'LOGIN_SUCCESS', payload: profile });
    });
  } else {
    store.dispatch({ type: 'LOGIN_ERROR' });
  }
};

const login = () => lock.show();
const logout = () => {
  localStorage.setItem('accessToken', '');
  localStorage.setItem('profile', '');
  store.dispatch({
    type: 'LOGOUT_SUCCESS',
  });
};

lock.on('authenticated', getProfile);

export default {
  login,
  logout,
  getProfile,
};
