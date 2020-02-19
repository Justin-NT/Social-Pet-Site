import React, { Component } from "react";
import Signup from "./signup";
import Signin from "./signin";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
