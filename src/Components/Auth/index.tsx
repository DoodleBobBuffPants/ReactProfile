import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import * as env from "environment";

interface Props {
  children?: React.ReactNode;
}

const AuthProvider : FC<Props> = (props) : ReactElement => {
  const history = useHistory();
  const onRedirect = (state : any) => { history.push(state?.returnTo || window.location.pathname); };
  
  return <Auth0Provider
    domain={env.REACT_APP_AUTH_DOMAIN}
    audience={env.REACT_APP_AUTH_AUDIENCE}
    clientId={env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={env.REACT_APP_AUTH_REDIRECT_URI(window.location.origin)}
    onRedirectCallback={state => onRedirect(state)}>
    {props.children}
  </Auth0Provider>;
}

export { AuthProvider };
