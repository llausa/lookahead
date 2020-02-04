import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonInput = (props) => {

  const Primary = {
    color: "#006EE2",
    margin: "20px",
    border: "1px solid #006EE2"
  }

  const Secondary = {
    color: "rgb(140, 140, 140)",
    margin: "30px 80px",
    fontSize: "8px"
  }

  const Disabled = {
    color: "#C4C4C4",
    margin: "20px",
    border: "1px solid #C4C4C4"
  }

  return (<> {props.disabled? (<Button onClick={props.onClick} variant="outlined" type={props.type} style={Disabled} color={props.color} disabled > {props.text} </Button>)
  :
  (<Button variant="outlined" onClick={props.onClick} type={props.type} color='primary' style={props.primary? Primary : Secondary} color={props.color}> {props.text} </Button>)}
  </>)

}

export default ButtonInput