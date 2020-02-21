import React, { Component } from "react";
import "./App.css";
import Adopt from "./Components/Adopt/Adopt";
import Auth from "./Components/Auth/Auth";

interface AppState {
  sessionToken: string | null;
}

interface AppProps {
  updateToken?: any;
}

class App extends Component<AppProps, AppState> {
  state: AppState = {
    sessionToken: ""
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      console.log("hi");
      let localToken = localStorage.getItem("token");
      this.setState({ sessionToken: localToken });
    }
  }

  shouldComponentUpdate(prevProps: any, prevState: any) {
    if (prevState.sessionToken !== this.state.sessionToken) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.sessionToken !== this.state.sessionToken) {
      console.log("Current state value for token: ", this.state.sessionToken);
      console.log("previous state value for token: ", prevState.sessionToken);
      // this.setState({ sessionToken: ">:|" });
    } else {
      console.log("no");
    }
  }

  componentWillUnmount() {
    console.log("yes");
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token: ", newToken);
    this.setState({ sessionToken: newToken });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
    console.log("token cleared");
  };

  test = () => {
    localStorage.setItem("token: ", "testing");
    this.setState({ sessionToken: "testing" });
    console.log("token has been changed");
  };

  render() {
    return (
      <div>
        <Adopt />
        <Auth updateToken={this.updateToken} />
        <button onClick={() => this.test()}>
          Click to update token hackily
        </button>
        <button onClick={() => this.clearToken()}>Clear token</button>
      </div>
    );
  }
}

export default App;
