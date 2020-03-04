import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Signup from "../Components/Auth/signup";
import styled from "styled-components";
import Signin from "../Components/Auth/signin";
import Kitty from "../assets/kitty.jpeg";
import Link from "@material-ui/core/Link";

interface BodyProps {
  updateToken(newToken: string): any;
  roleCheck: any;
  sessionToken: string;
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
  };

  toggleDialogue = (): any => {
    this.setState({
      inSwitch: !this.state.inSwitch
    });
  };
  render() {
    return (
      <div className="maindiv">
        <Background>
          <h3>
            Tired of seeing a depressing scene as you mindlessly scroll through
            your social media?
          </h3>
          <h1>Don't!</h1>
          <h3>Stay happy and keep your heart full at Petazoa!</h3>

          <Center>
            <Signin
              updateToken={this.props.updateToken}
              roleCheck={this.props.roleCheck}
            />
          </Center>
          <Button onClick={this.toggleDialogue}>No Profile? Click Here.</Button>
          {this.state.inSwitch === false ? null : (
            <Signup
              toggleDialogue={this.toggleDialogue}
              inSwitch={this.state.inSwitch}
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
            />
          )}
          <Kitten src={Kitty} alt="Petazoa" />
        </Background>
      </div>
    );
  }
}

const Background = styled.div`
  background: linear-gradient(to bottom, white, #e1e6e2);
  font-family: "Krona One", sans-serif;
`;

const Kitten = styled.img`
  width: 100vw;
  position: static;
  height: 250px;
`;

const Center = styled.div`
  float: center;
`;

export default Body;
