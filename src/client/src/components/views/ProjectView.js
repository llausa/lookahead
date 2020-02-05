import React from "react"
import Grid from "../Grid"
import Nav from '../Nav'
import Background from '../Background'
import TitleText from '../TitleText'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const buttonMain = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2",
}

function ProjectView(props) {

    const { projectId } = useParams()

        return (
            <>
            <div style={{position: "absolute", display: "flex", flexDirection: "column", width: "100vw", height: "100vh", overflowX: "hidden"}}>
            <Nav backButtonLink ='/projects' BackButton={true} MenuButton={false}/>
            <h1 data-cy="projectView" style={{margin: "20px", fontSize: "70px", color: "#006EE2", alignSelf:"center" }} >{props.projectName ," view"}</h1>

            <Button component={Link} to={`/projects/${projectId}/edit`}  color='primary' style={buttonMain} > Edit Project </Button>

            <div style={{overflowX: "scroll"}}>
            <Grid redirect={props.redirect}/>

            </div>
            <Background/>
            </div>
            </>
        )
}

export default ProjectView;