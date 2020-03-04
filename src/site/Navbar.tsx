import React from "react";
import Typography from "@material-ui/core/Typography";
<<<<<<< HEAD
import Feed from "../Components/Feed";
import MyProfile from "../Components/MyProfile";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#61c899",
=======
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
  },
  peta: {
    fontFamily: "Krona One",
    fontSize: "40px",
<<<<<<< HEAD
    color: "white",  
  },
  blinks: {
      fontFamily: "Krona One",
      fontSize: "10px",
      justifyContent: "space-between",
      color: "white",
  }, 
})


interface SigninProps {}

interface SigninState {}
=======
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
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd

const NavbarDisplay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
<<<<<<< HEAD
        
            <Typography className={classes.peta}>Petazoa</Typography>
            <Link className={classes.blinks} to="/">
              Home
            </Link>
            <Link className={classes.blinks} to="/MyProfile">
              My Profile
            </Link>
            <Link className={classes.blinks} to="/Feed">
              My Feed
            </Link>
      <Router>
        <Switch>
          <Route exact path="/Feed">
            <Feed />
          </Route>
          <Route exact path="/MyProfile">
            <MyProfile />
          </Route>
        </Switch>
      </Router>
        
=======
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
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
    </div>
  );
};

export default NavbarDisplay;
