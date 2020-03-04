import React, { Component, SyntheticEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

interface SignupProps extends RouteComponentProps {
  updateToken: any;
  inSwitch: boolean;
  toggleDialogue: any;
  sessionToken: string;
  roleCheck: any;
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
        this.props.roleCheck(data.user.admin);
      })
      .then(() => {
        this.createProfile();
        this.props.toggleDialogue();
        this.props.history.push("/feed");
      })
      // .then(() => this.props.toggleDialogue())
      .catch(err => console.log("error: ", err));
  };

  // return this.state.password.length >= 8 &&
  //     /^(?=.*\d)(?=.*[!@#$%^&*])$/.test(this.state.password)
  //     ?

  createProfile = () => {
    let url = "http://localhost:3000/profiles/create";
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
        gender: this.state.gender
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log("error: ", err));
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

export default withRouter(Signup);
