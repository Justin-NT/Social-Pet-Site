import React, { Component } from "react";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Signin from "../Components/Auth/signin"
import Signup from "../Components/Auth/signup"
import Kitty from "../assets/kitty.jpeg";
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles({
//     root: {
        
//     });



interface BodyProps {
    updateToken(newToken: string): any;
    updateUserId: any;
}

interface BodyState {
    inSwitch: boolean,
}

const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);
    font-family: 'Krona One', sans-serif;
`;

const Kitten = styled.img`
    width: 100vw;
    position: static;
`
const Center = styled.div`
    

`

class Body extends Component<BodyProps, BodyState>{
   

    state: BodyState = {
        inSwitch: false
    }

    openDialogue = () => {
        console.log("fired")
        this.setState({
            inSwitch: !this.state.inSwitch
        })
    }

    render() {
        // const classes = useStyles();
        return (
            <div>
                <Background>
                    <h3>Tired of seeing a depressing scene as you mindlessly scroll through your social media?</h3>
                    <h1>Don't!</h1>
                    <h3>Stay happy and keep your heart full at Petazoa!</h3>
                    <Center><Signin updateToken={this.props.updateToken} updateUserId={this.props.updateUserId} />
                    <Button onClick={this.openDialogue}>No Profile? Click Here.</Button>
                    {(this.state.inSwitch === false) ? null : <Signup inSwitch={this.state.inSwitch} updateToken={this.props.updateToken} updateUserId={this.props.updateUserId}/>} 

                </Center>
                {/* <Signup updateToken={props.updateToken} updateUserId={props.updateUserId}/> */}
                    <Kitten src={Kitty} alt="Petazoa" />
                </Background>
            
            </div >
        );
    }
}



export default Body;


