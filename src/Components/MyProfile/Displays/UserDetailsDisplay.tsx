import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export interface UserDetailsDisplayProps {
  profile: any;
  deleteProfile: any;
  editProfileSwitch: any;
}

export interface UserDetailsDisplayState {}

class UserDetailsDisplay extends Component<
  UserDetailsDisplayProps,
  UserDetailsDisplayState
> {
  constructor(props: UserDetailsDisplayProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("UserDetailDisplay Mounted");
  }
  render() {
    return (
      <div
        style={{
          border: "1px solid black"
        }}
      >
        {this.props.profile !== undefined ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h4>Name: {this.props.profile.name}</h4>
            </Grid>
            <Grid item xs={6}>
              <h4>Animal: {this.props.profile.animal}</h4>
            </Grid>
            <Grid item xs={6}>
              <h4>Gender: {this.props.profile.gender}</h4>
            </Grid>
            <Grid item xs={6}>
              <h4>Bio: {this.props.profile.bio}</h4>
            </Grid>
            <button
              onClick={() => this.props.deleteProfile(this.props.profile.id)}
            >
              Delete Profile
            </button>
            <button onClick={() => this.props.editProfileSwitch()}>
              Update Profile
            </button>
          </Grid>
        ) : (
          <div>Profile is undefined</div>
        )}
      </div>
    );
  }
}

export default UserDetailsDisplay;
