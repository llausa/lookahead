import React from "react";

import Button from '@material-ui/core/Button';

import DateInput from '../DateInput'
import TextInput from '../TextInput'
import FormInput from '../FormInput'
import PasswordInput from '../PasswordInput'
import ButtonInput from '../ButtonInput'


function NewLookaheadView() {

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
        console.log("Signup Pressed")
    }

    return (
        <div data-cy="newProjectView" style={mystyle}>
            <h1 style={{margin: "40px 0 10px 0", fontSize: "40px"}}>New Lookahead</h1>
        {/* <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please fill out all fields.</p> */}
        <TextInput label="Title" required={true} />
        <TextInput label="Description" multiline={true} />

        <DateInput label="Start Date"/>
        <DateInput label="End Date"/>
        
        <FormInput/>

        <PasswordInput label="Password"/>
        <PasswordInput label="Confirm Password"/>

        <ButtonInput main={true} text="Save">Save</ButtonInput>

        </div>
    )
}

export default NewLookaheadView;