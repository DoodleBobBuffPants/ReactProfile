import React, { FC, ReactElement } from "react";
import cookie from 'react-cookies';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";

interface Props {}

function onLogout() {
  cookie.remove('react-profile-bearer-token', { path: '/' });
  cookie.remove('react-profile-user', { path: '/' });
}

const Logout : FC<Props> = () : ReactElement => {
  const { logout } = useAuth0();

  return <Button primary onClick={() => { onLogout(); logout({ returnTo: window.location.origin }); }}>Log Out</Button>;
};

export { Logout };
