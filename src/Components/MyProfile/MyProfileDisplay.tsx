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
// import DeleteIcon from "@material-ui/icons/Delete";
// import SendIcon from "@material-ui/icons/Send";
// import UpdateIcon from "@material-ui/icons/Update";
import { TextField } from "@material-ui/core";
import CommentDisplay from "./CommentDisplay";
import PostModal from "./PostModal";

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
  sessionToken: any;
  classes: any;
  getPosts: any;
  userIdTest: any;
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
    console.log(url);
    console.log(newComment);
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
      .then(json => {
        console.log(json);
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
        title: this.props.post.title,
        feeling: this.props.post.feeling,
        body: newBody
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("Updated successfully", json);
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
    console.log("MyProfile Display mounted");
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.post !== this.props.post) {
      console.log(
        "prevProps: ",
        prevProps.post,
        "current post prop: ",
        this.props.post
      );
    }
    if (this.state.comments !== prevState.comments) {
      console.log("Comments are updating");
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
          : this.setState({ comments: json.comment });
      })
      .catch(err => console.log("Error: ", err));
  };

  deleteComment = (id: number) => {
    let url = `http://localhost:3000/comments/${id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
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
        console.log(json);
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
      .then(json => {
        console.log("Post deleted", json);
      })
      .then(() => this.props.getPosts())
      .catch(err => console.log("error", err));
  };

  updatePost = () => {
    console.log("This is where the post update will happen");
    this.setState({ editPost: !this.state.editPost });
    console.log(this.props.userIdTest);
  };

  updateComment = (commentId: number) => {
    console.log("This is where the comment update will happen");
    this.setState({ editComment: !this.state.editComment });
    return commentId;
  };

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
          title={this.props.post.title}
          subheader={this.props.post.createdAt}
        />
        <Typography variant="body2" color="textSecondary" component="p">
          This will contain the body of what the user types:
          {this.props.post.body}
        </Typography>
        <CardMedia
          className={classes.media}
          image={Catdog}
          title={this.props.post.title}
        />
        <CardContent className={classes.comments}>
          {this.state.comments.map((comment: any) => {
            return (
              <div key={comment.id}>
                {comment.comment}
                {comment.userId === this.props.userIdTest ? (
                  <Button
                    color="primary"
                    variant="contained"
                    // startIcon={<UpdateIcon />}
                    className={classes.button}
                    onClick={() => this.updateComment(comment.id)}
                  >
                    Update
                  </Button>
                ) : null}
                {comment.userId === this.props.userIdTest ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    // startIcon={<DeleteIcon />}
                    className={this.props.classes.button}
                    onClick={() => this.deleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                ) : null}
                {this.state.editComment ? (
                  <CommentDisplay
                    comment={comment}
                    closeModal={this.closeCommentModal}
                    submitCommentUpdate={this.submitCommentUpdate}
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
          ></TextField>
          <Button
            color="primary"
            variant="contained"
            // startIcon={<SendIcon />}
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
              // startIcon={<UpdateIcon />}
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
              // startIcon={<DeleteIcon />}
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

// Code that no longer serves a purpose but might be needed again

// displayComments = () => {
//     return this.state.comments.map((comment: any) => {
//       return (
//         <div key={comment.id}>
//           {comment.comment}
//           {` comment id: `} {comment.id}
//           {` postid: ${this.props.post.id}`}
//           {` userid: ${comment.userId}`}
//           {comment.userId === this.state.userId ? (
//             <Button
//               color="secondary"
//               variant="contained"
//               startIcon={<DeleteIcon />}
//               className={this.props.classes.button}
//               onClick={() => this.deleteComment(comment.id)}
//             >
//               Delete
//             </Button>
//           ) : null}
//         </div>
//       );
//     });
//   };

//   checkOwnership = () => {
//     // let useridString = localStorage.getItem("userid");
//     // let useridNumber = useridString ? parseInt(useridString) : null;
//     // console.log("running checkOwnership");
//     // typeof useridNumber === "number"
//     //   ? this.setState({ userId: useridNumber })
//     //   : console.log("not a number");
//   };
