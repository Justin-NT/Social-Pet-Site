import React, { Component, SyntheticEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
// import {withRouter} from "react-router";
import APIURL from '../../helpers/environment';

const Container = styled.div`
  width: 90%;
  height: 50%;
  font-family: "Krona One", sans-serif;
  display: flex;
`;
const Header = styled.div`
  background-color: #61c899;
  font-family: "Krona One", sans-serif;
`;

interface SignupProps {
  updateToken: any;
  inSwitch: boolean;
  toggleDialogue: any;
  sessionToken: string;
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
  profilePicture: string;
  open: boolean;
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
      bio: "",
      profilePicture: "",
      open: true
    };
  }

  signupFetch = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = `${APIURL}/auth/signup`;
    fetch(url, {
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
      .then(() => this.props.toggleDialogue())
      .then(() => this.createProfile())
      .catch(err => console.log("error: ", err));
  };

  createProfile = () => {
    let url = `${APIURL}/profiles/create`;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        name: this.state.name,
        animal: this.state.animal,
        bio: this.state.bio,
        gender: this.state.gender,
        profilePicture: this.state.profilePicture
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(err => console.log("error: ", err));
  };

  doublePost = (e: SyntheticEvent) => {
    this.createProfile();
    this.signupFetch(e);
  };

  render() {
    return (
      <Container>
        <Dialog open={this.props.inSwitch}>
          <Header>
            <DialogTitle>Sign up and Create a profile</DialogTitle>
          </Header>
          <form onSubmit={e => this.signupFetch(e)}>
            <DialogContent>
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
              <TextField
                type="file"
                value={this.state.profilePicture}
                name="profilepicture"
                placeholder="profile picture"
                onChange={e =>
                  this.setState({ profilePicture: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">Create Profile</Button>
              <Button onClick={() => this.props.toggleDialogue()}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    );
  }
}

export default Signup;
