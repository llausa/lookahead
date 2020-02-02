import React from "react";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import UserCard from '../UserCard'
import Nav from '../Nav'
import TitleText from '../TitleText'
import Background from '../Background'

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

function CreateNewPressed() {
    console.log("Create New Pressed")
}

const ProjectUsersView = () => {

    return (
        <>
        <Nav MenuButton={true} />
        <div style={page}>

        
        
        <div data-cy="projectsView" style={mystyle}>
        <TitleText text="Project Users" style={{ marginTop: "50px"}} />

        <UserCard/>
        <UserCard/>

        <Button onClick={CreateNewPressed} variant="outlined" style={buttonMain} color="primary">Create New <AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        <Background/>
        </>
    )
}

export default ProjectUsersView