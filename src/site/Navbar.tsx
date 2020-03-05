import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
// import { grey } from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = (theme: any) => {
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#61c899"
    },
    title: {
      flexGrow: 1
    },
    color: {
      backgroundColor: "#61c899",
      justifyContent: "space-between"
    },
    peta: {
      fontFamily: "Krona One",
      fontSize: "40px"
    },
    links: {
      fontFamily: "Krona One",
      fontSize: "10px",
      justifyContent: "space-between",
      color: "white"
    },
    button: {
      fontFamily: "Krona One",
      color: "white",
      alignSelf: "right"
    },
    input: {
      justifyContent: "center"
    },
    blinks: {
      fontFamily: "Krona One",
      fontSize: "7px",
      justifyContent: "space-between"
    },
    mainLinks: {
      display: "flex"
    },
    divLinks: {
      justifyContent: "flex-end"
    }
  });
};

interface IProps {
  sessionToken: string;
  classes: any;
}
class NavbarDisplay extends Component<IProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Box justifyContent="flex-end">
          <Appbar position="static" className={classes.color}>
            <Toolbar className={classes.mainLinks}>
              <Typography className={classes.peta}>Petazoa</Typography>
              <div className={classes.divLinks}>
                <Link className={classes.blinks} to="/">
                  <Button>Home</Button>
                </Link>
                <Link className={classes.blinks} to="/MyProfile">
                  <Button>My Profile</Button>
                </Link>
                <Link className={classes.blinks} to="/Feed">
                  <Button>My Feed</Button>
                </Link>
              </div>
            </Toolbar>
          </Appbar>
        </Box>
      </div>
    );
  }
}

export default withStyles(useStyles)(NavbarDisplay);
