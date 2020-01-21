import React from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ProjectCard from '../ProjectCard'

const mystyle = {
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#2baafe",
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
    color: "#2baafe",
    margin: "20px",
    border: "1px solid rgb(43, 170, 254)"
}


function CreateNewPressed() {
    console.log("Create New Pressed")
}

function ProjectsView() {

    return (
        <div style={mystyle}>
        <h1 data-cy="projectsView">My Lookaheads</h1>

        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>

        <Button onClick={CreateNewPressed} variant="outlined" style={buttonMain} color="primary">Create New <AddIcon style={smallIcon} /></Button>
        </div>
    )
}

export default ProjectsView;