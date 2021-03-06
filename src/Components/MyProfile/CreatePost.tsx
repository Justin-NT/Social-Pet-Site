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
import APIURL from "../../helpers/environment";
import "./Displays/CreatePost.css";

const useStyles = (theme: any) =>
  createStyles({
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

interface CreatePostProps {
  sessionToken: string;
  getPosts: any;
  classes: any;
  grabImage: any;
  // postPicture: string;
}

interface CreatePostState {
  body: string;
  postPicture: string;
}

class CreatePost extends Component<CreatePostProps, CreatePostState> {
  constructor(props: CreatePostProps) {
    super(props);
    this.state = {
      body: "",
      postPicture: ""
    };
  }

  //Create a Post fetch
  submitPost = () => {
    console.log("submitted");
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
      // postPicture:
    })
      .then(res => res.json())
      .then(post => {
        this.props.grabImage(post.postPicture);
        console.log(post.postPicture);
      })
      .then(() => this.props.getPosts())
      .catch(err => console.log("error", err));
  };

  render() {
    const { classes } = this.props;
    return (
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
