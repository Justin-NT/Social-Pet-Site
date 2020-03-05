import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
// import { grey } from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withRouter, RouteComponentProps } from "react-router-dom";

// const useStyles = (theme: any) => {
//   createStyles({
//     root: {
//       flexGrow: 1,
//       backgroundColor: "#61c899",
//       "& .MuiButton-text": {
//         color: "white"
//       }
//     },
//     title: {
//       flexGrow: 1
//     },
//     color: {
//       backgroundColor: "#61c899",
//       justifyContent: "space-between"
//     },
//     peta: {
//       fontFamily: "Krona One",
//       fontSize: "40px"
//     },
//     links: {
//       fontFamily: "Krona One",
//       fontSize: "10px",
//       justifyContent: "space-between",
//       color: "white",
//       textDecoration: "none"
//     },
//     button: {
//       fontFamily: "Krona One",
//       color: "white",
//       alignSelf: "right"
//     },
//     input: {
//       justifyContent: "center"
//     },
//     blinks: {
//       fontFamily: "Krona One",
//       fontSize: "7px",
//       justifyContent: "space-between"
//     },
//     mainLinks: {
//       display: "flex"
//     },
//     divLinks: {
//       justifyContent: "flex-end"
//     }
//   });
// };

interface IProps extends RouteComponentProps {
  sessionToken: string;
  // classes: any;
  signout: any;
}

class NavbarDisplay extends Component<IProps> {
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Box justifyContent="flex-end">
          <Appbar
            position="static"
            
            style={{ backgroundColor: "#4FA818" }}
          >
            <Toolbar >
              <Typography >Petazoa</Typography>
              <div >
                <Link
                  
                  style={{ textDecoration: "none" }}
                  to="/"
                >
                  <Button>Home</Button>
                </Link>
                <Link
                  
                  to="/MyProfile"
                  style={{ textDecoration: "none" }}
                >
                  <Button>My Profile</Button>
                </Link>
                <Link
                  
                  to="/Feed"
                  style={{ textDecoration: "none" }}
                >
                  <Button>My Feed</Button>
                </Link>
                {this.props.sessionToken !== null &&
                this.props.sessionToken &&
                this.props.sessionToken !== "" ? (
                  <Button
                    onClick={() => {
                      this.props.history.push("/splashpage");
                      this.props.signout();
                    }}
                  >
                    Signout
                  </Button>
                ) : null}
              </div>
            </Toolbar>
          </Appbar>
        </Box>
      </div>
    );
  }
}

// export default withStyles(useStyles)(NavbarDisplay);
export default withRouter(NavbarDisplay);
