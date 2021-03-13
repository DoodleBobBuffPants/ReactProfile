import React, { FC, ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "semantic-ui-react";
import { LOGIN_REDIRECT, setBearerToken } from "environment";
import { User } from "Types";

interface Props {
  onError : (error : Error) => void,
  onSuccess : () => void,
  setUser : (user : User) => void,
}

const LoggedIn : FC<Props> = (props) : ReactElement => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const history = useHistory();
  
  useEffect(() => {
    const setTokenAndGetUser = async () => {
      setBearerToken(await getAccessTokenSilently());
      if (isAuthenticated && user) {
        props.setUser({ name: user.name, picture: user.picture });
        history.push(`/${LOGIN_REDIRECT}`);
      }
    }

    setTokenAndGetUser()
      .then(_ => props.onSuccess())
      .catch(e => props.onError(e));
  }, [isAuthenticated, user]);

  return <Loader active inline="centered" content="Loading Profile..."/>;
};

export { LoggedIn };
