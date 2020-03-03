import React, { createRef, SyntheticEvent } from "react";
import "./Comment.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

interface CommentProps {
  comment: any;
  closeModal: any;
  submitCommentUpdate: any;
}

interface CommentState {
  newComment: string | null;
}

class commentModal extends React.Component<CommentProps, CommentState> {
  inputRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.inputRef = createRef();
    this.state = { newComment: this.props.comment.comment };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div className="modal--overlay">
        <div className="modal">
          <h1>Update your Comment</h1>
          <Grid item xs={12}>
            <TextField
              inputRef={this.inputRef}
              type="text"
              onChange={e => this.setState({ newComment: e.target.value })}
              value={this.state.newComment}
              variant="outlined"
              placeholder={this.props.comment.comment}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <button
                onClick={() =>
                  this.props.submitCommentUpdate(
                    this.props.comment.id,
                    this.state.newComment
                  )
                }
              >
                Save comment
              </button>
            </Grid>
            <Grid item xs={6}>
              <button onClick={() => this.props.closeModal()}>Cancel</button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default commentModal;
