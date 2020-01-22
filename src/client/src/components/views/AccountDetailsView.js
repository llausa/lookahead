import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AccountDetailsView() {

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

    function SavePressed() {
        console.log("Save Pressed")
    }

    return (
        <div data-cy="detailsView" style={mystyle}>
        <h1>Edit Account</h1>
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
        <Button onClick={SavePressed} variant="outlined" style={buttonMain} color="primary">Save</Button>
        </div>
    )  
}

export default AccountDetailsView;