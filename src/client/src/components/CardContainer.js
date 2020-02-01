import React from 'react'
import Card from '@material-ui/core/Card'

const CardContainer = (props) => {

    const card = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#006EE2",
        minHeight: "50vh",
        width: "90vw",
        maxWidth: "500px",
        margin: "auto",
        borderRadius: "30px"
    }

    const innerDiv = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#006EE2",
        margin: "auto",
        height: "100%",
        width: "100%",
    }

    const page ={
        display: "flex",
        backgroundImage: `url(${props.background})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        position: "absolute",
    }


    return (
        <div style={page}>
            <Card style={card}>
                <div style={innerDiv} >
                    {props.children}
                </div>
            </Card>
        </div>
    )
}

export default CardContainer