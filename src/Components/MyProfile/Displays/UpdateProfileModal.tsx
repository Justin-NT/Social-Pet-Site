import React, { Component } from "react";
import "./Modal.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

interface UpdateProfileModalProps {
  closeModal: any;
  submitProfileUpdate: any;
  profile: any;
}

interface UpdateProfileModalState {
  name: string;
  animal: string;
  gender: string;
  bio: string;
}

class UpdateProfileModal extends Component<
  UpdateProfileModalProps,
  UpdateProfileModalState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: this.props.profile.name,
      animal: this.props.profile.animal,
      gender: this.props.profile.gender,
      bio: this.props.profile.bio
    };
  }

  render() {
    return (
      <div className="modal--overlay">
        <div className="modal">
          <h1>Update your Profile</h1>
          <Grid item xs={12}>
            <TextField
              type="text"
              variant="outlined"
              value={this.state.name}
              placeholder={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              label="name"
            />
            <TextField
              type="text"
              variant="outlined"
              value={this.state.animal}
              placeholder={this.state.animal}
              onChange={e => this.setState({ animal: e.target.value })}
              label="animal"
            />
            <TextField
              type="text"
              variant="outlined"
              value={this.state.gender}
              placeholder={this.state.gender}
              onChange={e => this.setState({ gender: e.target.value })}
              label="gender"
            />
            <TextField
              type="text"
              variant="outlined"
              value={this.state.bio}
              placeholder={this.state.bio}
              onChange={e => this.setState({ bio: e.target.value })}
              label="bio"
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <button
                onClick={() =>
                  this.props.submitProfileUpdate(
                    this.props.profile.id,
                    this.state.name,
                    this.state.animal,
                    this.state.gender,
                    this.state.bio
                  )
                }
              >
                Save Update
              </button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <button onClick={() => this.props.closeModal()}>Cancel</button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default UpdateProfileModal;
