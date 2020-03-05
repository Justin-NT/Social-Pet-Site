import React, { Component, SyntheticEvent } from "react";
import FeedDisplay from "./Posting/FeedDisplay";
import { withStyles, createStyles } from "@material-ui/core/styles";
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
    let url = "http://localhost:3000/posts/all";
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
    let url = "http://localhost:3000/posts/create";
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
          <form
            onSubmit={e => {
              this.createPost(e);
              this.newsFeed();
            }}
          >
            <input
              type="text"
              value={this.state.body}
              name="body"
              placeholder="body"
              onChange={e => this.setState({ body: e.target.value })}
            />
            <input type="file" id="upload" />
            <button>Create Post</button>
          </form>
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
