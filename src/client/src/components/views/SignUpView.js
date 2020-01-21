import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SignUpView() {
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

    function SignupPressed() {
        console.log("Login Pressed")
    }

    
    return (
        <div style={mystyle}>
        <h1 style={{margin: "40px 0 10px 0"}}>Signup</h1>
        <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please fill out all fields.</p>
        <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="First Name"
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="Last Name"
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <TextField
          style={inputStyle}
          id="outlined"
          label="Position"
          defaultValue=""
          variant="outlined"
          size="small"
        />

        <p style={{fontSize:"12px", margin:"10px"}}>Please enter your Email and Password</p>

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
        <TextField
        style={inputStyle}
          required
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
        />

        <Button onClick={SignupPressed} variant="outlined" style={buttonMain} color="primary">Signup</Button>
        </div>
    )
}

export default SignUpView;