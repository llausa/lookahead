import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import UserCard from '../UserCard'
import Nav from '../Nav'
import TitleText from '../TitleText'
import Background from '../Background'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import API from "../../axios.config"

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


const ProjectUsersView = () => {

    const { projectId } = useParams()

    const [users, setUsers] = useState([])

    useEffect(() => {
      API.get(`api/projects/${projectId}/users`)
      .then(res => {
          setUsers(res.data.users)
      })
    }, [])

    return (
        <>
        <Nav backButtonLink = {`/projects/${projectId}`} BackButton={true} MenuButton={false} />
        <div style={page}>



        <div data-cy="projectsView" style={mystyle}>
        <TitleText text="Project Users" style={{ marginTop: "50px"}} />

        {users.map(user => {
            return <UserCard user={user.name} userPrivilege={user.role} userPosition={user.position} userEmail={user.email} userEdit={true}/>
        })}

        {/* <UserCard user="Elon Musk" userPrivilege="Owner" userPosition="Genius" userEmail="Elon@Musk.com" userEdit={true}/> */}
        {/* <UserCard user="Steve Jobs" userPrivilege="Read/Write" userPosition="Remote Worker" userEmail="Steve@apple.com" userEdit={true}/> */}

        <Button component={Link} to={`/projects/${projectId}/users/add`} variant="outlined" style={buttonMain} color="primary">Add User<AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        <Background/>
        </>
    )
}

export default ProjectUsersView