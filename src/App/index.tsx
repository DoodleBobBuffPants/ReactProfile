import React, { FC, ReactElement, useState } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cookie from 'react-cookies';
import { Grid, Message } from "semantic-ui-react";
import "./index.scss";
import { USER_COOKIE } from "environment";
import { User } from "Types";
import { Header, Landing, LoggedIn, Profile } from "App";

interface Props {}

const App : FC<Props> = () : ReactElement => {
  const [error, setError] = useState({ message: "" });
  const [user, setUser] = useState(cookie.load(USER_COOKIE) ?? { name: "", picture: "" });

  function onError(error : Error) {
    setError({ message: error.message });
  }

  function onSuccess() {
    setError({ message: "" });
  }

  function onSetUser(user : User) {
    setUser(user);
    cookie.save(USER_COOKIE, user, { path: '/' });
  }
  
  return <Router>
    <Header/>
    
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column width={3}/>
        
        <Grid.Column width={10}>
          {error.message != "" && <Message error header={error.message}/>}
          <Switch>
            <Route exact path="/">
              <Landing/>
            </Route>
            
            <Route exact path="/logged-in">
              <LoggedIn
                onError={onError}
                onSuccess={onSuccess}
                setUser={onSetUser}
              />
            </Route>

            <Route exact path="/profile">
              <Profile user={user}/>
            </Route>
          </Switch>
        </Grid.Column>

        <Grid.Column width={3}/>
      </Grid.Row>
    </Grid>
  </Router>
}

const hotApp = hot(module)(App);
export { hotApp as App };
export * from "./Header";
export * from "./Pages";
