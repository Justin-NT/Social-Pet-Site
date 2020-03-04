import React, { Component } from "react";
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import Signup from "../Components/Auth/signup"
import styled from "styled-components";
import Signin from "../Components/Auth/signin";
=======
import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import {Link} from "react-router-dom";
import Signin from "../Components/Auth/signin";
// import Signup from "../Components/Auth/signup"

import Link from "@material-ui/core/Link";
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
import Kitty from "../assets/kitty.jpeg";

interface BodyProps {
  updateToken(newToken: string): any;
<<<<<<< HEAD
}

interface BodyState {
  inSwitch: boolean;
}

class Body extends Component<BodyProps, BodyState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       inSwitch: true
//     };
//   }

  state: BodyState = {
    inSwitch: false
}

toggleDialogue = () :any => {
    console.log("fired")
    this.setState({
        inSwitch: !this.state.inSwitch
    })
}
  render() {
    return (
      <div className="maindiv">
        {console.log(this.props.updateToken)}
        <Background>
        <h3>Tired of seeing a depressing scene as you mindlessly scroll through your social media?</h3>
        <h1>Don't!</h1>
        <h3>Stay happy and keep your heart full at Petazoa!</h3>

          <Center><Signin updateToken={this.props.updateToken} /></Center>
          <Button onClick={this.toggleDialogue}>No Profile? Click Here.</Button>
          {(this.state.inSwitch === false) ? null : <Signup toggleDialogue={this.toggleDialogue} inSwitch={this.state.inSwitch} updateToken={this.props.updateToken}/>} 
          <Kitten src={Kitty} alt="Petazoa" />
        </Background>
      </div>
    );
  }
}

const Background = styled.div`
  background: linear-gradient(to bottom, white, #e1e6e2);
  font-family: 'Krona One', sans-serif;
=======
  roleCheck: any;
}

interface BodyState {
  inSwitch: boolean;
}

class Body extends Component<BodyProps, BodyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inSwitch: true
    };
  }
  render() {
    return (
      <div className="maindiv">
        <h3 className="mission">
          Tired of seeing a depressing scene as you mindlessly scroll through
          your social media?
        </h3>
        <h1 className="mission">Don't!</h1>
        <h3 className="mission">
          Stay happy and keep your heart full at Petazoa!{" "}
        </h3>

        <Background>
          <Signin
            updateToken={this.props.updateToken}
            roleCheck={this.props.roleCheck}
          />
          <Link>No Profile? Click here.</Link>
          {/* <Signup updateToken={props.updateToken} updateUserId={props.updateUserId}/> */}
          <Kitten src={Kitty} alt="Petazoa" />
        </Background>
      </div>
    );
  }
}

const Background = styled.div`
  background: linear-gradient(to bottom, white, #e1e6e2);
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
`;

const Kitten = styled.img`
  width: 100vw;
  position: static;
<<<<<<< HEAD
  height: 250px;
`;

const Center = styled.div`
  float: center;
`

=======
  flex-shrink: 1;
`;
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd

export default Body;
