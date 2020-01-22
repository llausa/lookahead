import React from "react";
import SignUpForm from "../forms/SignUpForm";


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

  

    
    return (
        <div data-cy="signupView" style={mystyle}>
        <h1 style={{margin: "40px 0 10px 0", fontSize: "70px"}}>Signup</h1>
        <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please fill out all fields.</p>
        <SignUpForm />
        </div>
    )
}

export default SignUpView;