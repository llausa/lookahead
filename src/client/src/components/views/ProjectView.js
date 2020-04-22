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
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AddAlarmIcon from '@material-ui/icons/AddAlarm';

// Main Button Styling
const buttonMain = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2",
}


function ProjectView(props) {

    // For Loading Animation
    const [loading, setLoading] = useState(true)

    let taskEdit = false

    // Makes Form Popup
    const [rerender, setRerender] = useState(1)

    const [editTaskForm, setEditTaskForm] = useState(false)

    const [project, setProject] = useState(false)

    const { projectId } = useParams()

    // Add tasks to project popup form
    const handleToggle = (boolean) => {
        setEditTaskForm(boolean)
        setRerender(rerender + 1)
    }

    // Loads Projects Magically
    useEffect(() => {
        API.get(
            `api/projects/${projectId}/`
        )
        .then(res => { 
            setProject(res.data.validProject)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            props.redirect('/projects')
          })
        }, [])

    return (
        <>
        <Loader style={{opacity: loading ? 1 : 0}} />
        { project ? <NewTaskOverlay handleToggle={() => handleToggle(false)} close={setEditTaskForm} edit={taskEdit} project={project} redirect={props.redirect} style={{opacity: editTaskForm ? 1 : 0}}/> : null}
        
        <div style={{position: "absolute", display: "flex", flexDirection: "column", width: "100vw", height: "100vh", overflowX: "hidden"}}>
        <Nav backButtonLink ='/projects' BackButton={true} MenuButton={true}/>
        <h1 data-cy="projectView" style={{margin: "20px", fontSize: "70px", color: "#006EE2", alignSelf:"center" }} >{project.title}</h1>

        <div style={{display: "flex", justifyContent: "space-around"}}>

        <Tooltip title="Edit Project" placement="top" arrow> 
            <Button component={Link} to={`/projects/${projectId}/edit`}  color='primary' style={buttonMain} > <EditIcon/> </Button>
        </Tooltip>

        <Tooltip title="Add User" placement="top" arrow> 
            <Button component={Link} to={`/projects/${projectId}/users`}  color='primary' style={buttonMain} > <PersonAddIcon/> </Button>
        </Tooltip>

        <Tooltip title="Add Task" placement="top" arrow>
            <Button onClick={() => handleToggle(true)} color='primary' style={buttonMain} > <AddAlarmIcon/> </Button>
        </Tooltip>

        </div>

        <div style={{overflowX: "scroll"}}>
        <Grid key={rerender} redirect={props.redirect}/>
        </div>
        <Background/>
        </div>
        </>
    )
}

export default ProjectView;