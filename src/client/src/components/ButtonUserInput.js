import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonUserInput = (props) => {

  const Primary = {
    color: "#006EE2",
    border: "1px solid #006EE2",
    fontSize: "8px"
  }

  const Secondary = {
    color: "rgb(140, 140, 140)",
    fontSize: "8px"
  }

  const Disabled = {
    color: "#C4C4C4",
    border: "1px solid #C4C4C4"
  }

  return (<> {props.add? (<Button variant="outlined" type={props.type} style={Primary} color={props.color} > {props.text} </Button>)
  :
  (<Button variant="outlined" type={props.type} style={props.primary? Primary : Secondary} color={props.color}> {props.text} </Button>)}
  </>)

}

export default ButtonUserInput