import React from "react"
import Grid from "../Grid"
import Nav from '../Nav'
import Background from '../Background'
import TitleText from '../TitleText'

function ProjectView(props) {

        return (
            <>
            <div style={{position: "absolute", display: "flex", flexDirection: "column", width: "100vw", height: "100vh", overflowX: "hidden"}}>
            <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false}/>
            <h1 data-cy="projectView" style={{margin: "20px", fontSize: "70px", color: "#006EE2", alignSelf:"center" }} >{props.projectName ," view"}</h1>

            <Grid redirect={props.redirect}/>

            </div>
            <Background/>
            </>
        )
}

export default ProjectView;