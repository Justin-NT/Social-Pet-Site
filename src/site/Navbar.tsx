import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Feed from "../Components/Feed";
import MyProfile from "../Components/MyProfile/MyProfile";
import Adopt from "../Components/Adopt";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
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
    fontSize: "40px",
    textDecoration: "none"
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
    justifyContent: "space-between",
    color: "white"
  }
});

interface SigninProps {}

interface SigninState {}

const NavbarDisplay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box justifyContent="flex-end">
        <Appbar position="static" className={classes.color}>
          <Toolbar>
            <Typography className={classes.peta}>Petazoa</Typography>
            <Link className={classes.links} to="/">
              Home
            </Link>
            <Link className={classes.links} to="/MyProfile">
              My Profile
            </Link>
            <Link className={classes.links} to="/Feed">
              My Feed
            </Link>
            <Link className={classes.links} to="/Adopt">
              Adopt
            </Link>
          </Toolbar>
        </Appbar>
      </Box>
    </div>
  );
};

export default NavbarDisplay;
