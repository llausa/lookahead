import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextInput from '../TextInput'
import axios from "axios"

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

    const SignupPressed = () => {
        console.log("Signup Pressed")
    }
    

    const signup = async () => {
      await axios.post(
        `https://vast-oasis-18718.herokuapp.com/api/users`, {
          "firstName": "Alex",
          "lastName" : "Leybourne",
          "email" : "alex@leybourne.com",
          "password" : "alexleybourne",
          "position": "CEO"
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const { fname, lname, position, email, pword1, pword2 } = this.state;

    return (
        <div data-cy="signupView" style={mystyle}>
        <h1 style={{margin: "40px 0 10px 0", fontSize: "70px"}}>Signup</h1>
        <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please fill out all fields.</p>

        <form>
        <TextInput required={true} label="First Name" />

        <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="First Name"
          name="fname"
          value={fname}
          defaultValue=""
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />
        <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="Last Name"
          name="lname"
          value={lname}
          defaultValue=""
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />
        <TextField
          style={inputStyle}
          id="outlined"
          label="Position"
          name="position"
          value={position}
          defaultValue=""
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />

        <p style={{fontSize:"12px", margin:"10px"}}>Please enter your Email and Password</p>

        <TextField
          style={inputStyle}
          required
          id="outlined"
          label="Email"
          name="email"
          value={email}
          defaultValue=""
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />

        <TextField
        style={inputStyle}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          name="pword1"
          value={pword1}
          autoComplete="current-password"
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />
        <TextField
        style={inputStyle}
          required
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          name="pword2"
          value={pword2}
          autoComplete="current-password"
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />
        <Button onClick={SignupPressed} variant="outlined" style={buttonMain} color="primary" type="submit">Signup</Button>
        </form>
        </div>
    )
}

export default SignUpView;