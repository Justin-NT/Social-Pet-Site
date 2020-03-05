import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";

export interface UserDetailsDisplayProps {
  profile: any;
  deleteProfile: any;
  editProfileSwitch: any;
  classes: any;
}

export interface UserDetailsDisplayState {}

const useStyles = (theme: any) =>
  createStyles({
    root: {
      minWidth: 275,
      border: "1px solid black"
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 16,
      textAlign: "center",
      color: "black",
      fontWeight: 400
    },
    pos: {
      marginBottom: 12
    },
    CardActions: {
      justifyContent: "center"
    },
    Button: {
      backgroundColor: "#4FA818",
      color: "black",
      fontWeight: "bold"
    }
  });

class UserDetailsDisplay extends Component<
  UserDetailsDisplayProps,
  UserDetailsDisplayState
> {
  constructor(props: UserDetailsDisplayProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("UserDetailDisplay Mounted");
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.profile !== undefined ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                variant="h5"
                component="h2"
                gutterBottom
              >
                {`${this.props.profile.name}, ${this.props.profile.animal}`}
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.profile.bio}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {this.props.profile.gender}
              </Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <Button
                variant="contained"
                className={classes.Button}
                size="small"
                onClick={() => this.props.deleteProfile(this.props.profile.id)}
              >
                Delete Profile
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.Button}
                onClick={() => this.props.editProfileSwitch()}
              >
                Update Profile
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(UserDetailsDisplay);
