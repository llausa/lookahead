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
  {hours: "1"},
  {hours: "2"},
  {hours: "3"},
  {hours: "4"},
  {hours: "5"},
  {hours: "6"},
  {hours: "7"},
  {hours: "8"},
  {hours: "9"},
  {hours: "10"},
  {hours: "11"},
  {hours: "12"},
  {hours: "13"},
  {hours: "14"},
  {hours: "15"},
  {hours: "16"},
  {hours: "17"},
  {hours: "18"},
  {hours: "19"},
  {hours: "20"},
  {hours: "21"},
  {hours: "22"},
  {hours: "23"},
  {hours: "24"},
]

const DurationPicker = (props) => {

    return (
        <>
        <Autocomplete
      id={props.id}
      style={{margin: "4px", width: "100%"}}
      size="small"
      onChange={props.onChange}
      disableClearable
      defaultValue= {{hours: "1"}}
      options={TimesList}
      getOptionLabel={option => option.hours}
      renderInput={params => (
        <CssTextField {...params} label={props.label} variant="outlined" fullWidth value = {props.value}/>
      )}
    />
    </>
    )
}
    


export default DurationPicker