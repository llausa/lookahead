import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {


    const multiline = props.multiline;
  if (multiline) {
      return(
    <TextField
        style={{margin: "4px"}}
        required={props.required}
        id="outlined-multiline-static"
        label={props.label}
        multiline
        rows="4"
        defaultValue=""
        variant="outlined"
        size="small"
    />)
  }
    return (
    <TextField
        style={{margin: "4px"}}
        required={props.required}
        id="outlined-required"
        label={props.label}
        defaultValue=""
        variant="outlined"
        size="small"
    />)
}
