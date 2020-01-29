import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function PasswordInput(props) {

  return (
    <TextField
        style={{margin: "4px"}}
        required
        id={"outlined-password-input" + props.id }
        label={props.label}
        type="password"
        autoComplete="current-password"
        variant="outlined"
        size="small"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
    />
  )
}

