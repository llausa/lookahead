import React from "react";

import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import MailIcon from '@material-ui/icons/Mail';


function PasswordChangeView() {

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
        height: "16px",
        margin: "4px"
    }
    
    function SendEmailPressed() {
        console.log("Send Email Pressed")
    }

    return (
        <div data-cy="passwordChangeForm" style={mystyle}>
        <h1 data-cy="passwordView">Password Change</h1>
        <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please enter your account email below for a reset link to be sent.</p>
            <TextField
            style={inputStyle}
            required
            id="outlined"
            label="Email"
            defaultValue=""
            variant="outlined"
            size="small"
            />
            <Button onClick={SendEmailPressed} variant="outlined" style={buttonMain} color="primary">Send Email <MailIcon style={smallIcon} /></Button>
        </div>
    )
}

export default PasswordChangeView;