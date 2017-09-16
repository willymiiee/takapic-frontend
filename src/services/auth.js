import history from "services/history";
import { WebAuth } from "auth0-js";

// ...
export default class Auth {
  auth0 = new WebAuth({
    domain: "viankakrisna.auth0.com",
    clientID: "lBF9tmmEKsdZQlk11r71haHxeP3XQhOZ",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://viankakrisna.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  login = (
    obj = {
      connection: "Username-Password-Authentication"
    }
  ) => {
    return this.auth0.popup.authorize(obj);
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
      } else if (err) {
        history.replace("/");
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    history.replace("/");
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the home route
    history.replace("/");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };
}
