import React, { Component, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface SigninState {
  email: string;
  password: string;
}

interface SigninProps {
  updateToken(newToken: string): any;
  updateUserId: any;
}

class Signin extends Component<SigninProps, SigninState> {
  constructor(props: SigninProps) {
    super(props);
    this.state = { email: "", password: "" };
  }

  signinFetch = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = "http://localhost:3000/auth/signin";
    if (
      this.state.password.length >= 8 &&
      /^(?=.*\d)+(?=.*[!@#$%^&*])/.test(this.state.password)
    ) {
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
          this.props.updateUserId(data.user.id);
        })
        .catch(err => console.log("error: ", err));
    } else {
      console.log(
        "Password requires minimum of 8 characters, with 1 number and one special character"
      );
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.signinFetch(e)}>
          <TextField
            type="email"
            value={this.state.email}
            name="email"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            type="password"
            value={this.state.password}
            name="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }
}

export default Signin;

// <form onSubmit={e => this.signinFetch(e)}>
//   <input
//     type="email"
//     placeholder="email"
//     value={this.state.email}
//     name="email"
//     onChange={e => this.setState({ email: e.target.value })}
//   />
//   <input
//     type="password"
//     placeholder="password"
//     value={this.state.password}
//     name="password"
//     onChange={e => this.setState({ password: e.target.value })}
//   />
//   <button>Signin</button>
// </form>
