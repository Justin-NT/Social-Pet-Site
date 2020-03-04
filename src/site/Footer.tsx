import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// import styled from "styled-components";




class Footer extends Component {
//     constructor(props){
//     super(props)
//     this.state ={}

// }




render(){
    return(
    <div>
        <FooterDisplay />
    </div>
    )
}
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Justin, Dylan, Karl
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const FooterDisplay = () => {

    return (
  <div>
    <footer>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            A collective effort brought to you from your three favorite Eleven Fifty codeboys.
        </Typography>
        <Copyright />
    </footer>
  </div>
);
}

export default Footer;
