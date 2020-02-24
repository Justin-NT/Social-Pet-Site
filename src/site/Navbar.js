import React, { Component } from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Feed from "../Components/Feed";
import MyProfile from "../Components/MyProfile";
import Adopt from "../Components/Adopt";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";



class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <NavbarDisplay />
      </div>
    );
  }
}



const useStyles = makeStyles({
  root: {
    
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: '#61c899',
    justifyContent: "space-between"
  },
  peta: {
    fontFamily: 'Krona One',
    fontSize: "40px",
  },
  links: {
      fontFamily: "Krona One",
      fontSize: "10px",
      justifyContent: "space-between",
      color: "white",
      
  },
  button: {
      fontFamily: 'Krona One',
      color: "white",
      alignSelf: "right",
  },
  input: {
       justifyContent: "center",
    }
  
  
})


const NavbarDisplay = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Appbar position="static" className={classes.color}>
        <Toolbar>
          <Typography className={classes.peta}>Petazoa</Typography>
          <Router>
            <Link className={classes.links} to="/MyProfile">My Profile</Link>
            <Link className={classes.links} to="/Feed">My Feed</Link>
            <Link className={classes.links} to="/Adopt">Adopt</Link>
          </Router>
          <FormControl className={classes.input}> 
            <TextField id="email" placeholder="Email" />
            <TextField id="password" placeholder="Password" />
             <Button className={classes.button} type="submit">Login</Button>
          </FormControl>
        </Toolbar>
      </Appbar>

      <Switch>
        <Route exact path="/Feed">
          <Feed />
        </Route>
        <Route exact path="/MyProfile">
          <MyProfile />
        </Route>
        <Route exact path="/Adopt">
          <Adopt />
        </Route>
      </Switch>
    </div>
  );
};

export default Navbar;
