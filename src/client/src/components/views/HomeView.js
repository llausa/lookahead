import React from "react"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import Logo from '../../images/LookaheadLogoBlue.svg'
import CardContainer from '../CardContainer'
import Menu from '../Menu'
import Background from '../Background'
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

    return (
        <>
        <CardContainer>
        
        <Zoom><img src={Logo} alt="Logo" style={logoStyle}  aria-label="logo"/></Zoom>
                    <Button component={Link} to="/login" variant="outlined" style={buttonMain} color="primary">Login</Button>
                    <Button component={Link} to="/signup" variant="outlined" style={{margin: "0 20px"}}>Signup</Button>
                    <Button component={Link} to="/account/password" variant="outlined" style={buttonResetP}>Reset Password <LockIcon style={smallIcon} /> </Button>
        </CardContainer>
        <Background blue={true} background2={true}/>
            </>
       
    )
}

export default HomeView;