import React, { Component, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components';

const Signinstyle = styled.div`
      background-color: #61c899;
      color: white;
      width: 75%;
      border-radius: 100px;
      justify-content: center;
      
`

interface SigninState {
  email: string;
  password: string;
}

interface SigninProps {
  updateToken(newToken: string): any;
}

class Signin extends Component<SigninProps, SigninState> {
  state: SigninState = { email: "", password: "" };

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
        console.log(data.sessionToken);
        console.log(this.props);
        this.props.updateToken(data.sessionToken);
      })
      .catch(err => console.log("error: ", err));
  };

  render() {
    return (
    
      <Signinstyle>
        <form onSubmit={e => this.signinFetch(e)}> 
            <TextField type="email" value={this.state.email} name="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })}/>
            <TextField type="password" value={this.state.password} name="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })}/>
             <Button type="submit">Login</Button>
          </form>
      </Signinstyle>
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
