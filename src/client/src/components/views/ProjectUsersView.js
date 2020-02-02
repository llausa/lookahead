import React from "react";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import UserCard from '../UserCard'
import Nav from '../Nav'
import TitleText from '../TitleText'
import Background from '../Background'
import { Link } from 'react-router-dom'

const mystyle = {
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#006EE2",
    padding: "10px",
    maxWidth: "400px",
    margin: "auto",
}

const smallIcon= {
    width: "auto",
    height: "16px",
    margin: "4px"
}

const buttonMain = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2",
}

const page ={
    backgroundColor: "none",
    height: "120%",
    width: "100%",
    position: "absolute",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
}

function AddUserPressed() {
    console.log("Add User Pressed")
}

const ProjectUsersView = () => {

    return (
        <>
        <Nav MenuButton={true} />
        <div style={page}>

        
        
        <div data-cy="projectsView" style={mystyle}>
        <TitleText text="Project Users" style={{ marginTop: "50px"}} />

        <UserCard user="Mr Yeet" userPrivilege="Owner" userEmail="MrYeet@yeetmail.com" userEdit={true}/>
        <UserCard userEdit={true}/>

        <Button component={Link} to="/project/:id/users/add" onClick={AddUserPressed} variant="outlined" style={buttonMain} color="primary">Add User<AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        <Background/>
        </>
    )
}

export default ProjectUsersView