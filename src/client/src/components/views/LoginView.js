import React from "react";
import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';


function LoginView() {

    const mystyle = {
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
    
    const inputStyle = {
        margin: "4px",
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

    function ResetPressed() {
        console.log("Reset Pressed")
    }

    return (
        <div data-cy="loginView" style={mystyle}>
            <h1 style={{margin: "40px 0 10px 0", fontSize: "70px"}}>Login</h1>
            <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please enter your email and password</p>
            <TextField
            style={inputStyle}
            required
            id="outlined"
            label="Email"
            defaultValue=""
            variant="outlined"
            size="small"
            />
            <TextField
            style={inputStyle}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
            />
            <Button onClick={LoginPressed} variant="outlined" style={buttonMain} color="primary">Login</Button>
            <Button component={Link} to="/account/password" onClick={ResetPressed} variant="outlined" style={buttonResetP}>Reset Password <LockIcon style={smallIcon} /> </Button>
        </div>
    )
}

export default LoginView;