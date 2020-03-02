import React, { Component } from "react";
import "./App.css";
// import Adopt from "./Components/Adopt/Adopt";
// import Auth from "./Components/Auth/Auth";
import Post from "./Components/Posting/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./Components/MyProfile/MyProfile";
import Navbar from "./site/Navbar";
import Body from "./site/Body";
import Footer from "./site/Footer";

interface AppState {
  sessionToken: string | null;
  userId: number;
  // sessionToken: any;
}

interface AppProps {
  updateToken?: any;
}



class App extends Component<AppProps, AppState> {
  state: AppState = {
    sessionToken: "",
    userId: 0
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      console.log("App mounted");
      let localToken = localStorage.getItem("token");
      this.setState({ sessionToken: localToken });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.sessionToken !== this.state.sessionToken) {
      console.log("Current state value for token: ", this.state.sessionToken);
      console.log("previous state value for token: ", prevState.sessionToken);
      // this.setState({ sessionToken: ">:|" });
      // localStorage.setItem("token", this.state.sessionToken);
    } else {
      console.log("no");
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  updateUserId = (id: number) => {
    this.setState({ userId: id });
  };
  

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              {/* <Auth
                updateToken={this.updateToken}
                updateUserId={this.updateUserId}
              /> */}
        <Body updateToken={this.updateToken} updateUserId={this.updateUserId}/>
              <Post sessionToken={this.state.sessionToken} />
            </Route>
            <Route exact path="/myprofile">
              <MyProfile
                sessionToken={this.state.sessionToken}
                userid={this.state.userId}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;









