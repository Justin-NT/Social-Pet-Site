import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles({
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
    justifyContent: "space-between",
    color: "white"
  }
});

interface IProps {
  sessionToken: string;
}
const NavbarDisplay = (props: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box justifyContent="flex-end">
        <Appbar position="static" className={classes.color}>
          <Toolbar>
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
          </Toolbar>
        </Appbar>
      </Box>
    </div>
  );
};

export default NavbarDisplay;
