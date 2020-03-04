import React, { Component } from "react";
import "./App.css";
// import Adopt from "./Components/Adopt/Adopt";
// import Auth from "./Components/Auth/Auth";
// import Post from "./Components/Posting/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./Components/MyProfile/MyProfile";
import Navbar from "./site/Navbar";
import Body from "./site/Body";
import Footer from "./site/Footer";

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

  updateToken = (newToken: string): any => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  render() {
    // {
    //   console.log(this.updateToken);
    // }
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Body updateToken={this.updateToken} />
              {/* <Post sessionToken={this.state.sessionToken} /> */}
            </Route>
            <Route exact path="/myprofile">
              <MyProfile sessionToken={this.state.sessionToken} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
