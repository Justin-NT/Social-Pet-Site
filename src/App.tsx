import React, { Component } from "react";
import "./App.css";
import Adopt from "./Components/Adopt/Adopt";
import Auth from "./Components/Auth/Auth";
import Post from "./Components/Posting/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./Components/MyProfile/MyProfile";

interface AppState {
  sessionToken: string | null;
}

interface AppProps {
  updateToken?: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: ""
    };
  }

  componentDidMount() {
    console.log("App mounted");
    if (localStorage.getItem("token")) {
      let localToken = localStorage.getItem("token");
      this.setState({ sessionToken: localToken });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.sessionToken !== this.state.sessionToken) {
      console.log("Current state value for token: ", this.state.sessionToken);
      console.log("previous state value for token: ", prevState.sessionToken);
    } else {
      console.log("no");
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  //userId is stored as a string in localstorage
  // updateUserId = (id: number) => {
  //   localStorage.setItem("userid", `${id}`);
  // };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Adopt />
              <Auth updateToken={this.updateToken} />
              <Post sessionToken={this.state.sessionToken} />
            </Route>
            <Route exact path="/myprofile">
              <MyProfile sessionToken={this.state.sessionToken} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
