import React from "react";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import UserCard from '../UserCard'
import Nav from '../Nav'
import Background from '../Background'
import Card from '@material-ui/core/Card'
import FormInput from '../FormInput'
import SearchIcon from '@material-ui/icons/Search'

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
    margin: "6px",
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

const CardStyle = {
    position: "sticky",
    margin: "20px",
    width: "90vw",
    height: "auto",
    maxWidth: "500px",
    alignSelf: "center",
    borderRadius: "25px",
    color: '#006EE2'
  }


const ProjectAddUsersView = () => {

    return (
        <>
        <Nav backButtonLink = "/project/:id/users" MenuButton={true} BackButton={true} />
        <div style={page}>

        
        
        <div data-cy="projectsView" style={mystyle}>
        
        <Card style={CardStyle}>
        <p style={{margin: "10px", fontWeight: "bold", fontSize: "40px"}}>Project Add Users</p>
        <div style={{margin: "20px"}}><FormInput type='text' label='Search Users' id='userSearch' name='userSearch'/> <Button variant="outlined" style={buttonMain} color="primary"><SearchIcon/></Button></div>
        </Card>

        <UserCard user="Marty McFly"  userPosition="Time Traveller" userEmail="Back2The@Future.com" />
        <UserCard user="Keanu Reeves"  userPosition="Assassin" userEmail="DontHurtMyDog@gmail.com" />
        
        <UserCard/>

        </div>
        </div>
        <Background/>
        </>
    )
}

export default ProjectAddUsersView