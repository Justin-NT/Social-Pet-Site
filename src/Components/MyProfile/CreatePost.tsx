import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = (theme: any) =>
  createStyles({
    root: {
      maxWidth: 600,
      minWidth: 400,
      margin: "1% 0 1% 0",
      border: "1px solid black"
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundColor: "pink"
    },
    avatar: {
      backgroundColor: red[500]
    },
    cardAct: {
      justifyContent: "space-evenly",
      backgroundColor: "orange"
    },
    testDiv: {
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
    }
  });

interface CreatePostProps {
  sessionToken: string;
  getPosts: any;
  classes: any;
}

interface CreatePostState {
  title: string;
  feeling: string;
  body: string;
}

class CreatePost extends Component<CreatePostProps, CreatePostState> {
  constructor(props: CreatePostProps) {
    super(props);
    this.state = {
      title: "Fake title",
      feeling: "",
      body: ""
    };
  }

  //Create a Post fetch
  submitPost = () => {
    console.log("submitted");
    let url = "http://localhost:3000/posts/create";
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        title: this.state.title,
        feeling: this.state.feeling,
        body: this.state.body
      })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(() => this.props.getPosts())
      .catch(err => console.log("error", err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
            <TextField
              placeholder="Type something here..."
              className={classes.TextField}
              value={this.state.body}
              onChange={e => this.setState({ body: e.target.value })}
            ></TextField>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.testDiv}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<PublishIcon />}
            >
              Upload an image
            </Button>
            <br />
            <Button
              color="primary"
              variant="contained"
              className={classes.postButton}
              startIcon={<SendIcon />}
              onClick={() => this.submitPost()}
            >
              Post
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(CreatePost);
