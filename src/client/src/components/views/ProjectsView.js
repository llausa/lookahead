import React from "react";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ProjectCard from '../ProjectCard'
import Nav from '../Nav'
import TitleText from '../TitleText'
import Background from '../../images/WhiteBackgroundSmall.jpg'

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
    backgroundImage: `url(${Background})`,
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

const ProjectsView = () => {

    return (
        <>
        <Nav MenuButton={true} />
        <div style={page}>

        
        
        <div data-cy="projectsView" style={mystyle}>
        <TitleText text="Projects" style={{ marginTop: "50px"}} />

        <ProjectCard title="YEEET" />
        <ProjectCard/>

        <Button onClick={CreateNewPressed} variant="outlined" style={buttonMain} color="primary">Create New <AddIcon style={smallIcon} /></Button>
        </div>
        </div>
        </>
    )
}

export default ProjectsView