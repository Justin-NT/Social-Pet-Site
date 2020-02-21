import React, { Component } from "react";
import Signup from "./signup";
import Signin from "./signin";

interface AuthProps {
  updateToken: any;
}

class Auth extends Component<AuthProps> {
  render() {
    return (
      <div>
        <Signup updateToken={this.props.updateToken} />
        <Signin updateToken={this.props.updateToken} />
      </div>
    );
  }
}

export default Auth;
