import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    color: {
        backgroundColor: '#8FBC8F'
    }
    
})



const NavbarDisplay = () => {
    const classes = useStyles();
    return(
        <div className={classes.color} id="font"> 
            <Appbar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h5">Petazoa</Typography>
                    <Button>Login</Button>
                </Toolbar>
            </Appbar>
        </div>
    )
}

export default NavbarDisplay;

                // <h2>Petazoa</h2>
                // <form className="signin">
                // <input id="email" label="Email" />
                // <input id="password" label="Password" />
                // <button id="submit"color="default">Login</button>
                // </form>
