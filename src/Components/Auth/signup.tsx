import React, { Component, SyntheticEvent } from "react";

interface SignupProps {
  updateToken: any;
}

interface SignupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      admin: false
    };
  }

  signupFetch = (e: SyntheticEvent) => {
    e.preventDefault();
    let endpoint = "http://localhost:3000/auth/signup";
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        admin: this.state.admin
      }),
      headers: new Headers({
        "Content-Type": "application/json"
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
        Signup
        <form onSubmit={e => this.signupFetch(e)}>
          <input
            placeholder="firstname"
            name="firstname"
            type="text"
            value={this.state.firstname}
            onChange={e => this.setState({ firstname: e.target.value })}
          />
          <input
            placeholder="lastname"
            name="lastname"
            type="text"
            value={this.state.lastname}
            onChange={e => this.setState({ lastname: e.target.value })}
          />
          <input
            placeholder="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button>Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
