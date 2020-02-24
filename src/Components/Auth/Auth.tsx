import React, { Component } from "react";
import Signup from "./signup";
import Signin from "./signin";

interface AuthProps {
  updateToken: any;
  updateUserId: any;
}

class Auth extends Component<AuthProps> {
  render() {
    return (
      <div>
        <Signup
          updateToken={this.props.updateToken}
          updateUserId={this.props.updateUserId}
        />
        <hr />
        <Signin
          updateToken={this.props.updateToken}
          updateUserId={this.props.updateUserId}
        />
      </div>
    );
  }
}

export default Auth;
