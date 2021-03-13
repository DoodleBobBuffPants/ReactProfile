import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cookie from 'react-cookies';
import { Grid, Message } from "semantic-ui-react";
import "./index.scss";
import { AppError, User } from "Types";
import { Header, Landing, LoggedIn, Profile } from "Components";

interface Props {}

interface State {
  error : AppError,
  user : User
}

class App extends Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = { error: { message: "" }, user: cookie.load("react-profile-user") ?? { name: "", picture: "" } };
    this.onError = this.onError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onSetUser = this.onSetUser.bind(this);
  }

  onError(error : Error) {
    this.setState({ ...this.state, error: { message: error.message } });
  }

  onSuccess() {
    this.setState({ ...this.state, error: { message: "" } });
  }

  onSetUser(user : User) {
    this.setState({ ...this.state, user });
    cookie.save('react-profile-user', user, { path: '/' });
  }
  
  render() {
    return <Router>
      <Header user={this.state.user}/>
      
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={3}/>
          
          <Grid.Column width={10}>
            {this.state.error.message != "" && <Message error header={this.state.error.message}/>}
            <Switch>
              <Route exact path="/">
                <Landing
                  onError={error => this.onError(error)}
                  onSuccess={() => this.onSuccess()}
                  setUser={user => this.onSetUser(user)}
                />
              </Route>
              
              <Route exact path="/logged-in">
                <LoggedIn
                  onError={error => this.onError(error)}
                  onSuccess={() => this.onSuccess()}
                  setUser={user => this.onSetUser(user)}
                />
              </Route>

              <Route exact path="/profile">
                <Profile user={this.state.user}/>
              </Route>
            </Switch>
          </Grid.Column>

          <Grid.Column width={3}/>
        </Grid.Row>
      </Grid>
    </Router>
  }
}

const hotApp = hot(module)(App);
export { hotApp as App };
