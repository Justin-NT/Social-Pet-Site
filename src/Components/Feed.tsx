import React, { Component, SyntheticEvent } from "react";
import FeedDisplay from "./Posting/FeedDisplay";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import APIURL from "../helpers/environment";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { red } from "@material-ui/core/colors";
import classes from "*.module.css";
import { userInfo } from "os";

const useStyles = (theme: any) =>
  createStyles({
    Header: {
      display: "flex",
      // alignContent: "space-evenly",
      justifyContent: "center"
    },
    Wrapper: {
      display: "flex",
      // alignContent: "space-evenly",
      justifyContent: "center"
    },
    root: {
      maxWidth: 600,
      minWidth: 400,
      margin: "1% 0 1% 0",
      border: "1px solid black",
      backgroundColor: "#C3D095"
    },
    avatar: {
      backgroundColor: red[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    buttonsContainer: {
      display: "flex",
      flexFlow: "wrap row",
      justifyContent: "center",
      width: "100%"
    },
    postButton: {
      width: "100%",
      margin: theme.spacing(1),
      backgroundColor: "#4FA818",
      fontWeight: "bold"
    },
    TextFieldBody: {
      margin: theme.spacing(1),
      minWidth: "80%"
    },
    TextFieldFile: {
      margin: "auto"
    },
    bodySection: {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "center"
    }
  });

interface FeedProps {
  sessionToken: any;
  classes: any;
  //   userid: number;
}

interface FeedState {
  posts: string[];
  body: any;
  comment: any;
  human: string;
  // profile: any;
  userId: number;
  postPicture: any;
  // postId: number;
}

class Feed extends Component<FeedProps, FeedState> {
  // constructor(props: any) {
  // super(props);
  state: FeedState = {
    // token: localStorage.getItem("token"),
    posts: [],
    body: "",
    comment: "",
    userId: 0,
    postPicture: "",
    human: ""
  };

  newsFeed = () => {
    //   e.preventDefault();
    let url = `${APIURL}/posts/all`;
    // console.log(this.props.sessionToken);
    // const formdata = new FormData();
    // formdata.append("postPicture", upload.files[0]);
    // formdata.append("body", JSON.stringify({ body: this.state.body }));
    fetch(url, {
      method: "GET",
      headers: new Headers({
        // "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
      // body: formdata
    })
      .then(res => res.json())
      .then(posts => {
        console.log(posts.post);
        // this.setState({ human: user.firstname });
        this.setState({ posts: posts.post });
      })
      .catch(err => console.log("Error:", err));
  };

  createPost = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = `${APIURL}/posts/create`;
    let upload: any = document.getElementById("upload");
    const formdata = new FormData();
    formdata.append("postPicture", upload.files[0]);
    formdata.append("body", JSON.stringify({ body: this.state.body }));

    fetch(url, {
      method: "POST",
      headers: new Headers({
        // "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: formdata
    })
      .then(res => res.json())
      .then(data => {
        // console.log("THIS IS IMPORTANT", data);
        this.setState({ userId: data.userId });
        this.setState({ postPicture: data.postPicture });
        // console.log(data.postPicture);
      })
      .then(() => {
        this.newsFeed();
      })

      .catch(err => console.log("Error: ", err));
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      this.newsFeed();
    } else {
      console.log(this.props.sessionToken);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.Header}>
          <h3>Post</h3>
        </div>
        <div className={classes.Wrapper}>
          <br />
          <br />
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.bodySection}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
                <TextField
                  placeholder="Type something here..."
                  variant="outlined"
                  multiline
                  rows="2"
                  rowsMax="8"
                  label="What's on your mind?"
                  className={classes.TextFieldBody}
                  value={this.state.body}
                  onChange={e => this.setState({ body: e.target.value })}
                ></TextField>
              </div>
            </CardContent>
            <CardActions disableSpacing>
              <div className={classes.buttonsContainer}>
                <TextField
                  type="file"
                  id="upload"
                  variant="filled"
                  className={classes.TextFieldFile}
                />
                <br />
                <Button
                  // color="primary"
                  variant="contained"
                  className={classes.postButton}
                  startIcon={<SendIcon />}
                  onClick={e => {
                    this.createPost(e);
                    // this.newsFeed();
                  }}
                >
                  Post
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
        {this.state.posts.map(post => {
          return (
            <FeedDisplay
              post={post}
              newsFeed={this.newsFeed}
              sessionToken={this.props.sessionToken}
              postPicture={this.state.postPicture}
              userId={this.state.userId}
            />
          );
        })}
      </div>
    );
  }
  // }
}
export default withStyles(useStyles)(Feed);
