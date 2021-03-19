import React, { FC, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "semantic-ui-react";
import { ON_LOGIN_REDIRECT } from "environment";

interface Props {}

const Landing : FC<Props> = () : ReactElement =>  {
  const [pageContents, setPageContents] = useState(<></>);
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      history.push(`/${ON_LOGIN_REDIRECT}`);
    }
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
