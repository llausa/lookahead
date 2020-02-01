import React from "react"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import Logo from '../../images/LookaheadLogoBlue.svg'
import Background from '../../images/BackgroundSmall.jpg'
import CardContainer from '../CardContainer'
import Menu from '../Menu'
import Zoom from 'react-reveal/Zoom'

const HomeView = () => {

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
        <>
           <Menu/>
        <CardContainer background={Background}>
        
        <Zoom><img src={Logo} alt="Logo" style={logoStyle}  aria-label="logo"/></Zoom>
                    <Button component={Link} to="/login" onClick={LoginPressed} variant="outlined" style={buttonMain} color="primary">Login</Button>
                    <Button component={Link} to="/signup" onClick={SignupPressed} variant="outlined" style={{margin: "0 20px"}}>Signup</Button>
                    <Button component={Link} to="/account/password" onClick={ResetPressed} variant="outlined" style={buttonResetP}>Reset Password <LockIcon style={smallIcon} /> </Button>
        </CardContainer>
            </>
       
    )
}

export default HomeView;