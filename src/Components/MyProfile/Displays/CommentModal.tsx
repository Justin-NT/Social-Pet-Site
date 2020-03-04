import React, { createRef, Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import "./Modal.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

interface CommentProps {
  comment: any;
  closeModal: any;
  submitCommentUpdate: any;
  classes: any;
}

interface CommentState {
  newComment: string | null;
}

const useStyles = (theme: any) =>
  createStyles({
    root: {
      maxWidth: 600,
      minWidth: 400,
      margin: "1% 0 1% 0"
    },
    Button: {
      margin: theme.spacing(1)
    },
    commentTextField: {
      width: "100%"
    }
  });

class commentModal extends Component<CommentProps, CommentState> {
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
    const { classes } = this.props;
    return (
      <div className="modal--overlay">
        <div className="modal">
          <h1>Update your Comment</h1>
          <Grid item xs={12} className={classes.root}>
            <TextField
              inputRef={this.inputRef}
              type="text"
              onChange={e => this.setState({ newComment: e.target.value })}
              value={this.state.newComment}
              variant="outlined"
              placeholder={this.props.comment.comment}
              label="Comment"
              multiline
              rowsMax="8"
              className={classes.commentTextField}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.Button}
                onClick={() =>
                  this.props.submitCommentUpdate(
                    this.props.comment.id,
                    this.state.newComment
                  )
                }
              >
                Save comment
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.Button}
                onClick={() => this.props.closeModal()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(commentModal);
