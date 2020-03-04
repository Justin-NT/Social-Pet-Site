import React from "react";
import Typography from "@material-ui/core/Typography";
import Feed from "../Components/Feed";
import MyProfile from "../Components/MyProfile";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#61c899",
  },
  peta: {
    fontFamily: "Krona One",
    fontSize: "40px",
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

const NavbarDisplay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
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
        
    </div>
  );
};

export default NavbarDisplay;
