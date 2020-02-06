import React, { useState, useEffect} from "react"
import Grid from "../Grid"
import Nav from '../Nav'
import Background from '../Background'
import TitleText from '../TitleText'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import NewTaskOverlay from '../NewTaskOverlay'
import Loader from '../Loader'
import API from '../../axios.config'

const buttonMain = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2",
}

function ProjectView(props) {

    let taskEdit = false

    // Makes Form Popup
    const [rerender, setRerender] = useState(1)

    const [editTaskForm, setEditTaskForm] = useState(false)

    const [project, setProject] = useState(false)

    const { projectId } = useParams()

    const handleToggle = (boolean) => {
        setEditTaskForm(boolean)
        setRerender(rerender + 1)
    }

    useEffect(() => {
        API.get(
            `api/projects/${projectId}/`
        )
        .then(res => { 
            setProject(res.data.validProject)
            
        }).catch((err) => {
            props.redirect('/projects')
          })
        }, [])

    return (
        <>
        <NewTaskOverlay handleToggle={() => handleToggle(false)} edit={taskEdit} project={project} redirect={props.redirect} style={{opacity: editTaskForm ? 1 : 0}}/>
        <div style={{position: "absolute", display: "flex", flexDirection: "column", width: "100vw", height: "100vh", overflowX: "hidden"}}>
        <Nav backButtonLink ='/projects' BackButton={true} MenuButton={true}/>
        <h1 data-cy="projectView" style={{margin: "20px", fontSize: "70px", color: "#006EE2", alignSelf:"center" }} >{props.projectName ," view"}</h1>

        <Button component={Link} to={`/projects/${projectId}/edit`}  color='primary' style={buttonMain} > Edit Project </Button>
        <Button component={Link} to={`/projects/${projectId}/users`}  color='primary' style={buttonMain} > Add Users to Project </Button>
        <Button color='primary' style={buttonMain} onClick={() => handleToggle(true)} > Add Tasks to Project </Button>

        <div style={{overflowX: "scroll"}}>
        <Grid key={rerender} redirect={props.redirect}/>
        </div>
        <Background/>
        </div>
        </>
    )
}

export default ProjectView;