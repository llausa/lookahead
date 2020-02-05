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

let TimesList = [
  {time: "01:00"},
  {time: "02:00"},
  {time: "03:00"},
  {time: "04:00"},
  {time: "05:00"},
  {time: "06:00"},
  {time: "07:00"},
  {time: "08:00"},
  {time: "09:00"},
  {time: "10:00"},
  {time: "11:00"},
  {time: "12:00"},
  {time: "13:00"},
  {time: "14:00"},
  {time: "15:00"},
  {time: "16:00"},
  {time: "17:00"},
  {time: "18:00"},
  {time: "19:00"},
  {time: "20:00"},
  {time: "21:00"},
  {time: "22:00"},
  {time: "23:00"},
  {time: "24:00"},
]

const TimePicker = (props) => {

    return (
        <>
        <Autocomplete
      id={props.id}
      style={{margin: "4px", width: "100%"}}
      size="small"
      disableClearable
      defaultValue= {{time: "1"}}
      options={TimesList}
      getOptionLabel={option => option.time}
      renderInput={params => (
        <CssTextField {...params} label={props.label} variant="outlined" fullWidth />
      )}
    />
    </>
    )
}
    


export default TimePicker