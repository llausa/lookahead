import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function EmailInput(props) {

  const Error = "Please enter a valid Email"
  let Valid = true

  const handleChange = event => {
    const input = (event.target.value)
    console.log(input)
    if (input.length < 6) {
      console.log('Less than 6 characters')
      Valid = false
    } else if (!input.includes('@')) {
      console.log('Does not include @ symbol')
      Valid = false
    } else if (!input.includes('.')) {
      console.log('Does not include a Dot')
      Valid = false
    } else {
      console.log('Valid Email')
      Valid = true
    }
  }

  const validate = props.validate
  
  if (validate) {
    if (Valid === false) {
      return (
        <TextField
          style={{margin: "4px"}}
          required
          error
          id={"outlined-error-helper-text" + props.id}
          label="Error"
          helperText={Error}
          variant="outlined"
          size="small"
          onChange={props.onChange}
          name={props.name}
          value={props.value}
        />
      )
    } else {
    return (
      <TextField
        style={{margin: "4px"}}
        required
        id={"outlined" + props.id}
        label="Email"
        variant="outlined"
        size="small"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
      />
    )
    }
  }
  return (
    <TextField
      style={{margin: "4px"}}
      required
      id={"outlined" + props.id}
      label="Email"
      variant="outlined"
      size="small"
      onChange={props.onChange}
      name={props.name}
      value={props.value}
    />
  )  
}

