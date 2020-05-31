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
import Loader from '../Loader'

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

export default function ProjectsView(props) {

    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setLoading(true)
        API.get(`api/projects`)
        .then(res => {
            setLoading(false)
            setProjects(res.data.projects)

        }).catch(err => {
            setLoading(false)
        })
    }, [])

    return (
        <>
        <Nav MenuButton={true} />
        <div style={page}>

        <div data-cy="projectsView" style={mystyle}>
        <Loader style={{opacity: loading ? 1 : 0}} />
        <TitleText text="Projects" style={{ marginTop: "50px"}} />

        {projects.map(project => {
            return <ProjectCard key={project._id} link={project._id} title={project.title}  start_date={project.start_date} end_date={project.end_date} location={project.location} />
        })}

        <Button component={Link} to="/projects/new" variant="outlined" style={buttonMain} color="primary">Create New <AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        <Background/>
        </>
    )
}