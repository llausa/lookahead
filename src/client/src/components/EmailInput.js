import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function EmailInput() {

  return (
    <TextField
      style={{margin: "4px"}}
      required
      id="outlined"
      label="Email"
      defaultValue=""
      variant="outlined"
      size="small"
    />
  )
}

