import React, { FC, ReactElement } from "react";
import cookie from 'react-cookies';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";
import { TOKEN_COOKIE, USER_COOKIE } from "environment";

interface Props {}

function onLogout() {
  cookie.remove(TOKEN_COOKIE, { path: '/' });
  cookie.remove(USER_COOKIE, { path: '/' });
}

const Logout : FC<Props> = () : ReactElement => {
  const { logout } = useAuth0();

  return <Button primary onClick={() => { onLogout(); logout({ returnTo: window.location.origin }); }}>Log Out</Button>;
};

export { Logout };
