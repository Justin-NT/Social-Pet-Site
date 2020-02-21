import React, { Component, SyntheticEvent } from "react";

interface SigninState {
  email: string;
  password: string;
}

interface SigninProps {
  updateToken(newToken: string): any;
}

class Signin extends Component<SigninProps, SigninState> {
  constructor(props: SigninProps) {
    super(props);
    this.state = { email: "", password: "" };
  }

  signinFetch = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = "http://localhost:3000/auth/signin";
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.updateToken(data.sessionToken);
      })
      .catch(err => console.log("error: ", err));
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.signinFetch(e)}>
          <input
            type="email"
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button>Signin</button>
        </form>
      </div>
    );
  }
}

export default Signin;
