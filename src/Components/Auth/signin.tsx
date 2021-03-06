import React, { Component, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import APIURL from "../../helpers/environment";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Signinstyle = styled.div`
  
  color: white;
  width: 75%;
  border-radius: 100px;
  justify-content: center;
`;
interface SigninProps extends RouteComponentProps {
  updateToken(newToken: string): any;
  roleCheck: any;
}

interface SigninState {
  email: string;
  password: string;
}

class Signin extends Component<SigninProps, SigninState> {
  state: SigninState = { email: "", password: "" };

  signinFetch = (e: SyntheticEvent) => {
    e.preventDefault();

    let url = `${APIURL}/auth/signin`;
    // let url = "http://localhost:3000/auth/signin";
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
        this.props.updateToken(data.sessionToken);
        this.props.roleCheck(data.user.admin);
      })
      .then(() => this.props.history.push("/feed"))
      .catch(err => console.log("error: ", err));
  };

  render() {
    return (
      <Signinstyle>
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
      </Signinstyle>
    );
  }
}
export default withRouter(Signin);
