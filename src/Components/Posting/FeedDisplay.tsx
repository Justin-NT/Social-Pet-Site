import React, { SyntheticEvent, Component } from "react";
// import Feed from "../Feed";
// import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
// import classes from "*.module.css";
// import src from "*.bmp";
import APIURL from "../../helpers/environment";

// const styles = (theme: Theme )

const useStyles = (theme: any) =>
  createStyles({
    mainDiv: {
      display: "flex",
      justifyContent: "center"
    },
    root: {
      maxWidth: 600,
      minWidth: 600,
      margin: "1% 0 1% 0",
      border: "1px solid black",
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    },
    image: {
      maxHeight: 500,
      maxWidth: 400
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundColor: "pink"
    },
    avatar: {
      backgroundColor: red[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    cardAct: {
      justifyContent: "space-evenly",
      backgroundColor: "orange"
    },
    buttonsContainer: {
      display: "flex",
      backgroundColor: "red",
      flexFlow: "wrap row",
      justifyContent: "center",
      width: "100%"
    },
    postButton: {
      width: "100%",
      margin: theme.spacing(1)
    },
    TextField: {
      margin: theme.spacing(1)
    },
    bodySection: {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "center"
    }
  });

interface FeedDisplayProps {
  post: any;
  newsFeed: any;
  sessionToken: string;
  postPicture: any;
  classes: any;
  userId: number;
  // postId: number;
}

interface FeedDisplayState {
  //   onClick: (e : SyntheticEvent) => void;
  //   Row: any;
  //   Column: any;
  //   Wrapper: any;
  comment: any;
  profile: string;
}

class FeedDisplay extends Component<FeedDisplayProps, FeedDisplayState> {
  state: FeedDisplayState = {
    comment: "",
    profile: ""
  };

  createComment = (e: SyntheticEvent, postId: number) => {
    e.preventDefault();
    let url = `${APIURL}/comments/create/${postId}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        comment: this.state.comment
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.props.newsFeed(e);
        console.log(this.props.postPicture);
      })
      .catch(err => console.log("Error:", err));
  };

  // findPet = (e: SyntheticEvent, userId: number) => {
  //   e.preventDefault();
  //   let url = `${APIURL}/profiles/${userId}`;
  //   fetch(url, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.sessionToken
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(profile => {
  //       this.setState({ profile: profile });
  //       this.props.newsFeed(e);
  //       // this.setState({ profile: profile });
  //     })
  //     .catch(err => console.log("error:", err));
  // };
  // componentWillUpdate(e: SyntheticEvent) {
  //   if (this.props.userId !== prevProps.userId) {
  //     this.findPet(e, this.props.userId);
  //   } else {
  //     console.log("lollipop");
  //   }
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainDiv}>
        <Card key={this.props.post.id} className={classes.root}>
          <CardActionArea>
            {/* <CardContent>
              {this.state.profile.map((name: any) => {
                <Typography variant="h2" color="textSecondary" component="p">
                  {name.name}
                </Typography>;
              })}
            </CardContent> */}
            <CardContent>
              {console.log(this.props.postPicture)}
              <Typography variant="body1" color="textSecondary" component="p">
                {this.props.post.body}
              </Typography>
            </CardContent>
            <CardContent>
              <img
                // src={`http://localhost:3000/${this.props.postPicture}`}
                src={`${APIURL}/${this.props.post.postPicture}`}
                alt=""
                className={classes.image}
              />

              {this.props.post.comments.map((comment: any) => (
                <Typography variant="body1" color="textSecondary" component="p">
                  Comment: {comment.comment}
                </Typography>
                // <img src={this.props.postPicture} />
              ))}
            </CardContent>
          </CardActionArea>
          <CardContent className={classes.bodySection}>
            {/* <Button size="small">Like</Button> */}
            <form
              onSubmit={(e: any) => {
                this.createComment(e, this.props.post.id);
                this.props.newsFeed(e);
              }}
            >
              <Input
                type="text"
                // value={""}
                name="comment"
                placeholder="comment"
                onChange={e => this.setState({ comment: e.target.value })}
              />
              <Button size="small" type="submit">
                Comment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withStyles(useStyles)(FeedDisplay);
