import React, { Component } from "react";
import "./App.css";
// import Adopt from "./Components/Adopt/Adopt";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./Components/MyProfile/MyProfile";
import Navbar from "./site/Navbar";
import Body from "./site/Body";
import Footer from "./site/Footer";
import Feed from "./Components/Feed";
import { Redirect } from "react-router-dom";

interface AppState {
  sessionToken: any;
  isUserAdmin: boolean;
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "",
      isUserAdmin: false
    };
  }

  componentDidMount() {
    console.log("App mounted");
    if (localStorage.getItem("token")) {
      let localToken = localStorage.getItem("token");
      this.setState({ sessionToken: localToken });
    }
  }

  updateToken = (newToken: string): any => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  roleCheck = (role: boolean) => {
    this.setState({ isUserAdmin: role });
  };

  signout = () => {
    localStorage.setItem("token", "");
    this.setState({ sessionToken: "" });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar
            sessionToken={this.state.sessionToken}
            signout={this.signout}
          />
          <Switch>
            <Route exact path="/">
              <Redirect to="/splashpage" />
            </Route>
            <Route exact path="/splashpage">
              <Body
                updateToken={this.updateToken}
                roleCheck={this.roleCheck}
                sessionToken={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/myprofile">
              <MyProfile
                sessionToken={this.state.sessionToken}
                isUserAdmin={this.state.isUserAdmin}
              />
            </Route>
            <Route exact path="/feed">
              <Feed sessionToken={this.state.sessionToken} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
