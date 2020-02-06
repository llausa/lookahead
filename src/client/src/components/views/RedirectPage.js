import React from "react"

const RedirectPage = (props) => {

    return (
        <>
        {props.redirect('/projects')}
        </>
    )
}

export default RedirectPage