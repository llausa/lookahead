import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {


  const multiline = props.multiline;
  if (multiline) {
      return(
    <TextField
        style={{margin: "4px"}}
        required={props.required}
        id={"outlined-multiline-static" + props.id}
        label={props.label}
        multiline
        rows="4"
        variant="outlined"
        size="small"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
    />)
  }
    return (
    <TextField
        style={{margin: "4px"}}
        required={props.required}
        id={"outlined-required" + props.id}
        label={props.label}
        variant="outlined"
        size="small"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
    />)
}

