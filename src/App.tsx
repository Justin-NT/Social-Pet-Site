import React, { Component } from "react";
import "./App.css";
// import Adopt from "./Components/Adopt/Adopt";
<<<<<<< HEAD
// import Auth from "./Components/Auth/Auth";
// import Post from "./Components/Posting/Post";
=======
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./Components/MyProfile/MyProfile";
import Navbar from "./site/Navbar";
import Body from "./site/Body";
import Footer from "./site/Footer";

interface AppState {
  sessionToken: string | null;
<<<<<<< HEAD
=======
  isUserAdmin: boolean;
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
}

interface AppProps {
  updateToken?: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
<<<<<<< HEAD
      sessionToken: ""
=======
      sessionToken: "",
      isUserAdmin: false
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
    };
  }

  componentDidMount() {
    console.log("App mounted");
    if (localStorage.getItem("token")) {
      let localToken = localStorage.getItem("token");
      this.setState({ sessionToken: localToken });
    }
  }

<<<<<<< HEAD
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.sessionToken !== this.state.sessionToken) {
      console.log("Current state value for token: ", this.state.sessionToken);
      console.log("previous state value for token: ", prevState.sessionToken);
    } else {
      console.log("no");
    }
  }
=======
  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (prevState.sessionToken !== this.state.sessionToken) {
  //     console.log("Current state value for token: ", this.state.sessionToken);
  //     console.log("previous state value for token: ", prevState.sessionToken);
  //   } else {
  //     console.log("no");
  //   }
  // }
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd

  updateToken = (newToken: string): any => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

<<<<<<< HEAD
=======
  roleCheck = (role: boolean) => {
    this.setState({ isUserAdmin: role });
  };

>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
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
<<<<<<< HEAD
              <Body updateToken={this.updateToken} />
              {/* <Post sessionToken={this.state.sessionToken} /> */}
            </Route>
            <Route exact path="/myprofile">
              <MyProfile sessionToken={this.state.sessionToken} />
=======
              <Body updateToken={this.updateToken} roleCheck={this.roleCheck} />
            </Route>
            <Route exact path="/myprofile">
              <MyProfile
                sessionToken={this.state.sessionToken}
                isUserAdmin={this.state.isUserAdmin}
              />
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
