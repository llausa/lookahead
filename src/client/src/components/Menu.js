import React from "react"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import MailIcon from '@material-ui/icons/Mail'
import EditIcon from '@material-ui/icons/Edit'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Cookies from 'js-cookie'

const MenuHolder = {
    zIndex: 4,
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "white"
}

const mystyle = {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#006EE2",
    padding: "10px",
    maxWidth: "400px",
    margin: "auto",
    zIndex: 10
}

let links=[
    "https://res.cloudinary.com/djic27lvo/video/upload/v1580790563/Sounds/Oooft.mp3",
    "https://res.cloudinary.com/djic27lvo/video/upload/v1580790555/Sounds/Villager1.mp3",
    "https://res.cloudinary.com/djic27lvo/video/upload/v1580790552/Sounds/Villager2.mp3",
    "https://res.cloudinary.com/djic27lvo/video/upload/v1580790553/Sounds/Yeet.mp3",
    "https://res.cloudinary.com/djic27lvo/video/upload/v1580791435/Sounds/Degenerate.m4a"
]

const buttonMain = {
    color: "#006EE2",
    margin: "0 20px 20px 20px",
    border: "1px solid #006EE2",
}

const buttonGeneral = {
    margin: "0 20px 20px 20px",
}


const smallIcon = {
    width: "auto",
    height: "18px",
    margin: "4px",
    fill: "gray"
}

const VersionText = {
    position: "absolute",
    color: "gray",
    fontSize: "10px",
    bottom: "40px",
    alignSelf: "center",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none"
}

function MyLookaheadsPressed() {
    console.log("My Lookaheads Pressed")
}

const hehe = () => {
    let link = links[Math.floor(Math.random() * links.length)]
    let audio = new Audio(link)
    audio.play()
}

function EditDetailsPressed() {
    console.log("Edit Details Pressed")
}

function ChangeEmailPressed() {
    console.log("Change Email Pressed")
}

function ChangePasswordPressed() {
    console.log("Change Password Pressed")
}

function LogoutPressed() {
    console.log("Logout Pressed")
    Cookies.remove("authToken")
}




const MenuView = (props) => {


    return (
        <div style={MenuHolder} className={props.className}>
            <div data-cy="MenuView" style={mystyle}>
                <h1 style={{margin: "40px 0 10px 0", fontSize: "70px"}}>Menu</h1>
                <Button component={Link} to="/projects" onClick={MyLookaheadsPressed} variant="outlined" style={buttonMain} color="primary">My Projects</Button>
                <Button component={Link} to="/account/details" onClick={EditDetailsPressed} variant="outlined" style={buttonGeneral}>Edit Details <EditIcon style={smallIcon}/></Button>
                <Button component={Link} to="/account/email" onClick={ChangeEmailPressed} variant="outlined" style={buttonGeneral}>Change Email <MailIcon style={smallIcon} /> </Button>
                <Button component={Link} to="/account/password" onClick={ChangePasswordPressed} variant="outlined" style={buttonGeneral}>Change Password <LockIcon style={smallIcon} /> </Button>
                <Button component={Link} to="/" variant="outlined" onClick={LogoutPressed} style={buttonGeneral}>Logout <ExitToAppIcon style={smallIcon} /></Button>
                <button onClick={hehe} style={VersionText}>lookahead v1.0.0 2020</button>
            </div>
        </div>
    )
}

export default MenuView