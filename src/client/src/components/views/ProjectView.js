import React, { useState} from "react"
import Grid from "../Grid"
import Nav from '../Nav'
import Background from '../Background'
import TitleText from '../TitleText'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import EditTaskOverlay from '../EditTaskOverlay'
import Loader from '../Loader'

const buttonMain = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2",
}

function ProjectView(props) {


    let taskEdit = false

    // Makes Form Popup
    const [editTaskForm, setEditTaskForm] = useState(false)

    const { projectId } = useParams()

    const handleToggle = () => {
        // setOpen(!open)
        setEditTaskForm(true)
    }

    const handleClose = () => {
        // setOpen(false)
    }

    return (
        <>
        <EditTaskOverlay edit={taskEdit} style={{opacity: editTaskForm ? 1 : 0}}/>
        <div style={{position: "absolute", display: "flex", flexDirection: "column", width: "100vw", height: "100vh", overflowX: "hidden"}}>
        <Nav backButtonLink ='/projects' BackButton={true} MenuButton={true}/>
        <h1 data-cy="projectView" style={{margin: "20px", fontSize: "70px", color: "#006EE2", alignSelf:"center" }} >{props.projectName ," view"}</h1>

        <Button component={Link} to={`/projects/${projectId}/edit`}  color='primary' style={buttonMain} > Edit Project </Button>
        <Button component={Link} to={`/projects/${projectId}/users`}  color='primary' style={buttonMain} > Add Users to Project </Button>
        <Button color='primary' style={buttonMain} onClick={handleToggle} > Add Tasks to Project </Button>

        <div style={{overflowX: "scroll"}}>
        <Grid redirect={props.redirect}/>
        </div>
        <Background/>
        </div>
        </>
    )
}

export default ProjectView;