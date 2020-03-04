import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Catdog from "../../assets/catdog.jpeg";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import UpdateIcon from "@material-ui/icons/Update";
import { TextField } from "@material-ui/core";
import CommentModal from "./Displays/CommentModal";
import PostModal from "./Displays/PostModal";

const useStyles = (theme: any) =>
  createStyles({
    root: {
      maxWidth: 600,
      minWidth: 500,
      margin: "1% 0 1% 0"
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundColor: "#61C899"
    },
    avatar: {
      backgroundColor: red[500]
    },
    comments: {
      backgroundColor: "white"
    },
    cardhead: {
      backgroundColor: "grey"
    },
    Button: {
      margin: theme.spacing(1)
    },
    cardAct: {
      justifyContent: "space-evenly",
      backgroundColor: "orange"
    }
  });

interface MyProfileDisplayProps {
  post: any;
  sessionToken: string;
  classes: any;
  getPosts: any;
  userIdTest: number;
  isUserAdmin: boolean;
}

interface MyProfileDisplayState {
  comments: [];
  createdComment: string;
  editComment: boolean;
  editPost: boolean;
}

class MyProfileDisplay extends Component<
  MyProfileDisplayProps,
  MyProfileDisplayState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: [],
      createdComment: "",
      editComment: false,
      editPost: false
    };
  }

  submitCommentUpdate = (commentId: number, newComment: string) => {
    let url = `http://localhost:3000/comments/${commentId}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        comment: newComment
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(() => {
        this.getComments();
      })
      .then(() => this.closeCommentModal())
      .catch(err => console.log("Error: ", err));
  };

  submitPostUpdate = (postId: number, newBody: string) => {
    let url = `http://localhost:3000/posts/${postId}`;
    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        body: newBody
      })
    })
      .then(res => res.json())
      .then(json => {
        // console.log("Updated successfully", json);
        this.props.getPosts();
        this.closePostModal();
      })
      .catch(err => console.log("error: ", err));
  };

  closeCommentModal = () => {
    this.setState({ editComment: false });
  };

  closePostModal = () => {
    this.setState({ editPost: false });
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.comments !== prevState.comments) {
      this.getComments();
    }
    if (this.props.userIdTest !== prevProps.userIdTest) {
      console.log("userid updating");
    }
  }

  getComments = () => {
    fetch(`http://localhost:3000/comments/${this.props.post.id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(json => {
        return JSON.stringify(json.comment) ===
          JSON.stringify(this.state.comments)
          ? null
          : json.comment !== undefined
          ? this.setState({ comments: json.comment })
          : console.log("Check this out yo");
      })
      .catch(err => console.log("Error: ", err));
  };

  deleteComment = (id: number) => {
    let url = `http://localhost:3000/comments/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(res => JSON.stringify(res))
      .then(json => {
        console.log(json);
        this.getComments();
      })
      .catch(err => console.log("Error: ", err));
  };

  postComment = () => {
    let url = `http://localhost:3000/comments/create/${this.props.post.id}`;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        comment: this.state.createdComment
      })
    })
      .then(res => res.json())
      .then(json => {
        this.getComments();
      })
      .catch(err => console.log("Error created the comment: ", err));
  };

  deletePost = () => {
    let url = `http://localhost:3000/Posts/${this.props.post.id}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(() => this.props.getPosts())
      .catch(err => console.log("error", err));
  };

  updatePost = () => {
    this.setState({ editPost: !this.state.editPost });
  };

  updateComment = (commentId: number) => {
    this.setState({ editComment: !this.state.editComment });
  };

  currentCommentId: any;

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        {this.state.editPost ? (
          <PostModal
            closeModal={this.closePostModal}
            post={this.props.post}
            submitPostUpdate={this.submitPostUpdate}
          />
        ) : null}
        <CardHeader
          className={classes.cardhead}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              Pet
            </Avatar>
          }
          subheader={this.props.post.createdAt}
        />
        <Typography variant="body1" color="textSecondary" component="p">
          This will contain the body of what the user types:
          {this.props.post.body}
        </Typography>
        <CardMedia className={classes.media} image={Catdog} />
        <CardContent className={classes.comments}>
          contains the area where comments are displayed
          {this.state.comments.map((comment: any) => {
            return (
              <div key={comment.id}>
                {comment.comment}
                {comment.userId === this.props.userIdTest ? (
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<UpdateIcon />}
                    className={classes.Button}
                    onClick={() => {
                      console.log(comment.id);
                      this.currentCommentId = comment.id;
                      console.log(this.currentCommentId);
                      this.updateComment(comment.id);
                    }}
                    // this.updateComment(comment.id)
                  >
                    Update
                  </Button>
                ) : null}
                {comment.userId === this.props.userIdTest ||
                this.props.isUserAdmin ? (
                  <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    className={classes.Button}
                    onClick={() => this.deleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                ) : null}
                {this.state.editComment ? (
                  <CommentModal
                    closeModal={this.closeCommentModal}
                    comment={comment}
                    currentCommentId={this.currentCommentId}
                    sessionToken={this.props.sessionToken}
                    getComments={this.getComments}
                  />
                ) : null}
              </div>
            );
          })}
        </CardContent>
        <CardActions disableSpacing className={classes.cardAct}>
          <TextField
            value={this.state.createdComment}
            variant="outlined"
            label="Post a comment..."
            onChange={e => this.setState({ createdComment: e.target.value })}
            multiline
            rowsMax="8"
          ></TextField>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SendIcon />}
            className={this.props.classes.button}
            onClick={() => this.postComment()}
          >
            Post
          </Button>
        </CardActions>
        <CardActions disableSpacing className={classes.cardAct}>
          {this.props.post.userId === this.props.userIdTest ? (
            <Button
              color="primary"
              variant="contained"
              startIcon={<UpdateIcon />}
              className={classes.button}
              onClick={() => this.updatePost()}
            >
              Update
            </Button>
          ) : null}
          {this.props.post.userId === this.props.userIdTest ? (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DeleteIcon />}
              className={classes.button}
              onClick={() => this.deletePost()}
            >
              Delete
            </Button>
          ) : null}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(MyProfileDisplay);
