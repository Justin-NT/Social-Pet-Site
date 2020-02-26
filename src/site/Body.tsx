import React, {Component} from "react";
import styled from 'styled-components';
// import {makeStyles} from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import {Link} from "react-router-dom";
import Signin from "../Components/Auth/signin"
// import Signup from "../Components/Auth/signup"

import Link from "@material-ui/core/Link";
// import Kitty from "../assets/kitty.jpeg";


interface BodyProps {
    updateToken(newToken: string): any;
    updateUserId: any;
  }

  interface BodyState {
    inSwitch: boolean,
  }


class Body extends Component <BodyProps,BodyState>{
    constructor(props:any){
    super(props)
    this.state ={
        inSwitch: true,
    
    }
}
render(){
    return(
    <div>
        <BodyDisplay />
    </div>
    )
}
}


const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);
`;


const BodyDisplay = (props:any) => {

  

    return (
  <div>
    <h3 className="mission">
      Tired of seeing a depressing scene as you mindlessly scroll through your
      social media?
    </h3>
    <h1 className="mission">Don't!</h1>
    <h3 className="mission">
      Stay happy and keep your heart full at Petazoa!{" "}
    </h3>
      
      
    
      <Background>
      <Signin updateToken={props.updateToken} updateUserId={props.updateUserId} />
            <Link>No Profile? Click here.</Link>
            {/* <Signup updateToken={props.updateToken} updateUserId={props.updateUserId}/> */}
    
          </Background>
      
  </div>
            );
}


export default Body;


