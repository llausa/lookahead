import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ProjectCard from '../ProjectCard'
import Nav from '../Nav'
import TitleText from '../TitleText'
import Background from '../Background'
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
    backgroundSize: "cover",
    height: "110%",
    width: "100%",
    position: "absolute",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
}


function CreateNewPressed() {
    console.log("Create New Pressed")
}

export default function ProjectsView(props) {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        API.get(`api/projects`)
        .then(res => {
            setProjects(res.data.projObjs)
            // console.log(res.data.projObjs)
        })
    }, [])

    return (
        <>
        <Nav MenuButton={true} />
        <div style={page}>

        <div data-cy="projectsView" style={mystyle}>
        <TitleText text="Projects" style={{ marginTop: "50px"}} />

        {projects.map(project => {
            console.log(project._id)
            return <ProjectCard key={project._id} link={project._id} title={project.title}  start_date={project.start_date} end_date={project.end_date} location={project.location} />
        })}

        <Button component={Link} to="/projects/new" onClick={CreateNewPressed} variant="outlined" style={buttonMain} color="primary">Create New <AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        <Background/>
        </>
    )
}