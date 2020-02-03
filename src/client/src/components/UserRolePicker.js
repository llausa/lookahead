import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { withStyles} from '@material-ui/core/styles'

const CssTextField= withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#C4C4C4',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
})(TextField)

let usersCurrentRole = "Undefined"

let RolesList = [
  {role: "Owner"},
  {role: "Read / Write"},
  {role: "Read Only"},
]

const UserRolePicker = (props) => {

    return (
        <>
        <Autocomplete
      id={props.id}
      style={{margin: "4px"}}
      size="small"
      disableClearable
      defaultValue={usersCurrentRole}
      options={RolesList}
      getOptionLabel={option => option.role}
      renderInput={params => (
        <CssTextField {...params} label={props.label} variant="outlined" fullWidth />
      )}
    />
    </>
    )
}
    


export default UserRolePicker