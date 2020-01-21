import React from "react";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

function HomeView() {

    const mystyle = {
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#2baafe",
        padding: "10px",
        maxWidth: "400px",
        margin: "auto",
    }

    const buttonMain = {
        color: "#2baafe",
        margin: "20px",
        border: "1px solid rgb(43, 170, 254)"
    }

    const buttonResetP = {
        color: "rgb(140, 140, 140)",
        margin: "30px 80px",
        fontSize: "8px"
    }

    const smallIcon= {
        width: "auto",
        height: "10px",
        margin: "4px"
    }

    function LoginPressed() {
        console.log("Login Pressed")
    }

    function SignupPressed() {
        console.log("Signup Pressed")
    }

    function ResetPressed() {
        console.log("Reset Pressed")
    }

    return (
        <div style={mystyle}>
        <h1>Welcome</h1>
        <Button component={Link} to="/login" onClick={LoginPressed} variant="outlined" style={buttonMain} color="primary">Login</Button>
        <Button component={Link} to="/signup" onClick={SignupPressed} variant="outlined" style={{margin: "0 20px"}}>Signup</Button>
        <Button component={Link} to="/account/password" onClick={ResetPressed} variant="outlined" style={buttonResetP}>Reset Password <LockIcon style={smallIcon} /> </Button>
        </div>
    )
}

export default HomeView;