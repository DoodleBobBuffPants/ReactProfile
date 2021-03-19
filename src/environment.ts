import cookie from 'react-cookies';

export const ON_LOGIN_REDIRECT = "logged-in";
export const AFTER_LOGIN_REDIRECT = "profile";

export const REACT_APP_AUTH_DOMAIN = "react-profile-app.eu.auth0.com";
export const REACT_APP_AUTH_AUDIENCE = "ReactProfileAPI"
export const REACT_APP_AUTH_CLIENT_ID = "eTdMIHCK9C1uXMVpT7PgoA6kDUa2OElv";
export const REACT_APP_AUTH_REDIRECT_URI = (domain : string) => `${domain}/${ON_LOGIN_REDIRECT}`;

export const TOKEN_COOKIE = "react-profile-bearer-token";
export const USER_COOKIE = "react-profile-user";

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
    cookie.save(TOKEN_COOKIE, token, { path: '/' });
  }
}
