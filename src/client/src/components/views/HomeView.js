import React from "react"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import Card from '@material-ui/core/Card'
import Logo from '../../images/LookaheadLogoBlue.svg'
import Background from '../../images/Background.jpg'

import axios from 'axios'

function HomeView() {

    const card = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#006EE2",
        height: "50vh",
        width: "90vw",
        maxWidth: "500px",
        margin: "auto",
        borderRadius: "30px"
    }

    const innerDiv = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#006EE2",
        margin: "auto",
        height: "100%",
        width: "100%",
    }

    const buttonMain = {
        color: "#006EE2",
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

    const logoStyle = {
        position: "relative",
        justifySelf: "center",
        alignSelf: "center",
        width: "40vw",
        left: "-5px",
        top: "-20px",
        maxWidth: "400px",
        margin: "30px 0"
    }

    const page ={
        display: "flex",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        position: "absolute",
    }

    const LoginPressed = () => {
        console.log("Login Pressed")
    }

    const SignupPressed = () => {
        console.log("Signup Pressed")
    }

    const ResetPressed = () => {
        console.log("Reset Pressed")
    }

    return (
        
           
        <div data-cy="homeView" style={page}>
            <Card style={card}>
                <div style={innerDiv} >
                    <img src={Logo} alt="Logo" style={logoStyle}  aria-label="logo"/>
                    <Button component={Link} to="/login" onClick={LoginPressed} variant="outlined" style={buttonMain} color="primary">Login</Button>
                    <Button component={Link} to="/signup" onClick={SignupPressed} variant="outlined" style={{margin: "0 20px"}}>Signup</Button>
                    <Button component={Link} to="/account/password" onClick={ResetPressed} variant="outlined" style={buttonResetP}>Reset Password <LockIcon style={smallIcon} /> </Button>
                </div>
            </Card>
        </div>
            
       
    )
}

export default HomeView;