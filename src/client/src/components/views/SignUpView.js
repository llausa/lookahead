import React, { Component } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import TextInput from '../TextInput'
import EmailInput from '../EmailInput'
import PasswordInput from '../PasswordInput'

export class Signup extends Component {
    state = {
      fname: "",
      lname: "",
      pos: "",
      email: "",
      pword: "",
      pword2: ""
    }
  
    onSubmit = (e) => {
        const { fname, lname, pos, email, pword, pword2} = this.state
        console.log("Signup Pressed")
        e.preventDefault()
        if (this.state.fname === "") {
          console.log("You a dummy")
        } else {

            let data = {
                "firstName": fname,
                "lastName" : lname,
                "email" : email,
                "password" : pword,
                "position": pos
            }

            console.log(data)

            axios.post(
            "https://vast-oasis-18718.herokuapp.com/api/users", data)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error.response.data)
            })
        }
        
    }
  
    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
  
    render() {

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

        const { fname, lname, pos, email, pword, pword2} = this.state

      return (
  
          <form onSubmit={this.onSubmit} className='form'>
            <div data-cy="signupView" style={mystyle}>
                <h1 style={{margin: "40px 0 10px 0", fontSize: "70px"}}>Signup</h1>
                    
                <p style={{margin: "0 0 20px 0", fontSize:"12px"}}>Please fill out all fields.</p>

                <TextInput value={fname} onChange={this.onChange} type="text" id="fname" name="fname" required={true} label="First Name" />
                <TextInput value={lname} onChange={this.onChange} type="text" id="lname" name="lname" required={true} label="Last Name" />
                <TextInput value={pos} onChange={this.onChange} type="text" id="pos" name="pos" required={false} label="Position" />

                <EmailInput value={email} onChange={this.onChange} id="email" name="email" />
                <PasswordInput value={pword} onChange={this.onChange} id="pword" name="pword" label="Password"/>
                <PasswordInput value={pword2} onChange={this.onChange} id="pword2" name="pword2" label="Confirm Password"/>

                <Button type="submit" style={buttonMain} color="primary" >Submit</Button>     
            </div>
          </form>
      )
    }
}

export default Signup
