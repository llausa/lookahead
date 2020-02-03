import React from "react";
import Grid from "../Grid"

function ProjectView(props) {

        return (

            <div>
            <h1 data-cy="projectView">Project View</h1>
            <Grid redirect={props.redirect} />
            </div>
            
        )
}

export default ProjectView;