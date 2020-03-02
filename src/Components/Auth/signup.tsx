import React, { Component, SyntheticEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface SignupProps {
  updateToken: any;
  updateUserId: any;
}

interface SignupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
  name: string;
  animal: string;
  gender: string;
  bio: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      admin: false,
      name: "",
      animal: "",
      gender: "",
      bio: ""
    };
  }

  signupFetch = (e: SyntheticEvent) => {
    e.preventDefault();

    let endpoint = "http://localhost:3000/auth/signup";
    return this.state.password.length >= 8 &&
      /^(?=.*\d)(?=.*[!@#$%^&*])$/.test(this.state.password)
      ? fetch(endpoint, {
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
            // this.props.updateUserId(data.user.id);
          })
          .catch(err => console.log("error: ", err))
      : console.log(
          "Password requires minimum of 8 characters, with 1 number and one special character"
        );
  };
  render() {
    return (
      <div>
        <form onSubmit={e => this.signupFetch(e)}>
          <TextField
            type="text"
            value={this.state.firstname}
            name="firstname"
            placeholder="First"
            onChange={e => this.setState({ firstname: e.target.value })}
          />
          <TextField
            type="text"
            value={this.state.lastname}
            name="lastname"
            placeholder="Last"
            onChange={e => this.setState({ lastname: e.target.value })}
          />
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
          <TextField
            type="text"
            value={this.state.name}
            name="name"
            placeholder="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <TextField
            type="text"
            value={this.state.animal}
            name="animal"
            placeholder="animal"
            onChange={e => this.setState({ animal: e.target.value })}
          />
          <TextField
            type="text"
            value={this.state.gender}
            name="gender"
            placeholder="gender"
            onChange={e => this.setState({ gender: e.target.value })}
          />
          <TextField
            type="text"
            value={this.state.bio}
            name="bio"
            placeholder="bio"
            onChange={e => this.setState({ bio: e.target.value })}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }
}

export default Signup;
