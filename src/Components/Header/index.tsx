import React, { FC, ReactElement, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header as SemanticHeader, Menu } from "semantic-ui-react";
import { setBearerToken } from "environment";
import "./index.scss";
import { User } from "Types";
import { Login, Logout } from "Components";

interface Props {
  user : User
}

const Header : FC<Props> = (props) : ReactElement => {
  const [authButton, setAuthButton] = useState(<Login/>);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthButton(<Logout/>);
    } else {
      setAuthButton(<Login/>);
      setBearerToken("");
    }
  }, [isAuthenticated, props.user]);
  
  return <Menu color="grey" inverted size='large'>
    <Menu.Menu className="centered-menu">
      <SemanticHeader as='h1' textAlign='center'>React Profile</SemanticHeader>
    </Menu.Menu>

    <Menu.Menu position='right'>
      <Menu.Item>{authButton}</Menu.Item>
    </Menu.Menu>
  </Menu>;
};

export { Header };
export * from "./Login";
export * from "./Logout";
