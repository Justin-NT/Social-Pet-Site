import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

interface ProfileModalProps {
  closeModal: any;
  post: any;
  submitPostUpdate: any;
}

interface ProfileModalState {
  newBody: string;
}

class ProfileModal extends React.Component<
  ProfileModalProps,
  ProfileModalState
> {
  constructor(props: any) {
    super(props);
    this.state = { newBody: this.props.post.body };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="modal--overlay">
        <div className="modal">
          <h1>Update your Post</h1>
          <Grid item xs={12}>
            <TextField
              type="text"
              value={this.state.newBody}
              variant="outlined"
              onChange={e => this.setState({ newBody: e.target.value })}
              placeholder={this.props.post.body}
              name="body"
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <button
                onClick={() =>
                  this.props.submitPostUpdate(
                    this.props.post.id,
                    this.state.newBody
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

export default ProfileModal;
