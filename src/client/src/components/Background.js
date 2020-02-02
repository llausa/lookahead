import React from 'react'

export const Background = (props) => {

    const BackGroundUrl1 = "https://images.unsplash.com/photo-1533750446969-255bbf191920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80"
    const BackGroundUrl2 = "https://images.pexels.com/photos/39578/imac-ipad-computer-tablet-39578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"


    const ImageBackground1 ={
        backgroundImage: `url(${BackGroundUrl1})`,
        backgroundSize: "cover",
        zIndex: "-3",
        height: "100%",
        width: "100%",
        position: "fixed",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
    }

    const ImageBackground2 ={
        backgroundImage: `url(${BackGroundUrl2})`,
        backgroundSize: "cover",
        zIndex: "-3",
        height: "100%",
        width: "100%",
        position: "fixed",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
    }

    const Overlay ={
        backgroundColor: "white",
        backgroundSize: "cover",
        opacity: "92%",
        zIndex: "-2",
        height: "100%",
        width: "100%",
        position: "fixed",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
    }


    return (
        <>
        <div style={Overlay} className={props.blue ? ("BlueGradient") : ("")} ></div>
        <div style={props.background2 ? (ImageBackground1) : (ImageBackground2)} className="BlackWhite"></div>
        </>
    )
}

export default Background
