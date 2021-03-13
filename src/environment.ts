import cookie from 'react-cookies';

export const REACT_APP_AUTH0_DOMAIN = "react-profile-app.eu.auth0.com";
export const REACT_APP_AUTH0_AUDIENCE = "ReactProfileAPI"
export const REACT_APP_AUTH0_CLIENT_ID = "eTdMIHCK9C1uXMVpT7PgoA6kDUa2OElv";
export const REACT_APP_AUTH0_REDIRECT_URI = (domain : string) => `${domain}/logged-in`;
export const LOGIN_REDIRECT = "profile";

let BEARER_TOKEN = "";
export function getBearerToken() {
  if (BEARER_TOKEN == "") {
    BEARER_TOKEN = cookie.load(TOKEN_COOKIE) ?? ""
  }
  return BEARER_TOKEN;
}

export function setBearerToken(token : string) {
  BEARER_TOKEN = token;
  if (token != "") {
    cookie.save('react-profile-bearer-token', token, { path: '/' });
  }
}
