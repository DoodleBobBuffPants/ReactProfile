import React, { FC, ReactElement } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";

interface Props {}

const Login : FC<Props> = () : ReactElement => {
  const { loginWithRedirect } = useAuth0();
  
  return <Button primary onClick={() => loginWithRedirect()}>Log In</Button>;
};

export { Login };
