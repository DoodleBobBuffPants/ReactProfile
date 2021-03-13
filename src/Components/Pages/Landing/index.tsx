import React, { FC, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "semantic-ui-react";
import { LOGIN_REDIRECT, setBearerToken } from "environment";
import { User } from "Types";

interface Props {
  onError : (error : Error) => void,
  onSuccess : () => void,
  setUser : (user : User) => void
}

const Landing : FC<Props> = (props) : ReactElement =>  {
  const [pageContents, setPageContents] = useState(<></>);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const history = useHistory();
  
  useEffect(() => {
    const setTokenAndShowProfile = async () => {
      if (isAuthenticated && user) {
        setBearerToken(await getAccessTokenSilently());
        props.setUser({ name: user.name, picture: user.picture });
        history.push(`/${LOGIN_REDIRECT}`);
      }
    }
    
    setTokenAndShowProfile()
      .then(_ => props.onSuccess())
      .catch(e => props.onError(e));
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated || user) {
      setPageContents(<Loader active inline="centered" content="Loading Profile..."/>);
    } else {
      setPageContents(<h3>Click 'Log In' above to get started</h3>);
    }
  }, [isAuthenticated, user]);
  
  return pageContents;
}

export { Landing };
