import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red, brown } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
// import Catdog from "../../assets/catdog.jpeg";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import UpdateIcon from "@material-ui/icons/Update";
import { TextField } from "@material-ui/core";
import CommentModal from "./Displays/CommentModal";
import PostModal from "./Displays/PostModal";
import APIURL from "../../helpers/environment";

// import styled from "styled-components";

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
      backgroundColor: "lightblue"
    },
    Button: {
      margin: theme.spacing(1),
      // backgroundColor: "#50A819",
      color: "white",
      borderRadius: 100
    },
    cardAct: {
      justifyContent: "space-evenly",
      backgroundColor: "white"
    },
    commentTextField: {
      minWidth: "70%"
      // backgroundColor: "white"
    },
    postImage: {
      maxHeight: "30vh",
      border: "1px solid black"
      // boxShadow: "0.5px 0.5px 0.5px 0.5px black"
      // Width: "%"
    },
    bodyDiv: {
      display: "flex",
      justifyContent: "center"
    },
    posts: {
      margin: "3%"
    }
  });

// const Button = styled.button`
//   backgroundColor: "#61C899",
//   color: "white",
//   borderRadius: 100px,

// `

interface MyProfileDisplayProps {
  post: any;
  sessionToken: string;
  classes: any;
  getPosts: any;
  userIdTest: number;
  isUserAdmin: boolean;
  postPicture: string;
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
    let url = `${APIURL}/comments/${commentId}`;
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
    let url = `${APIURL}/posts/${postId}`;
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
    fetch(`${APIURL}/comments/${this.props.post.id}`, {
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
    let url = `${APIURL}/comments/${id}`;
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
    let url = `${APIURL}/comments/create/${this.props.post.id}`;
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
    let url = `${APIURL}/Posts/${this.props.post.id}`;
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
        <Typography
          className={classes.posts}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {this.props.post.body}
        </Typography>
        <div className={classes.bodyDiv}>
          {/* <CardMedia className={classes.media} />
           */}
          <img
            src={`${APIURL}/${this.props.post.postPicture}`}
            className={classes.postImage}
          />
        </div>
        {console.log(this.props.post)}
        <CardContent className={classes.comments}>
          {this.state.comments.map((comment: any) => {
            return (
              <div key={comment.id}>
                {comment.comment}
                {comment.userId === this.props.userIdTest ? (
                  <Button
                    // color="#50A819"
                    style={{ backgroundColor: "#50A819" }}
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
            className={classes.commentTextField}
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
