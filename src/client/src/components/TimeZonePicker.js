import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import momentTZ from 'moment-timezone';

const defaultTimeZone = ({location: momentTZ.tz.guess()})
console.log(defaultTimeZone)

let timeZonesList = momentTZ.tz.names().map(timeZone => ({location: timeZone}))

const TimeZonePicker = (props) => {

    return (
        <>
        <Autocomplete
      id={props.id}
      style={{margin: "4px"}}
      size="small"
      disableClearable
      defaultValue={defaultTimeZone}
      options={timeZonesList}
      getOptionLabel={option => option.location}
      renderInput={params => (
        <TextField {...params} label={props.label} variant="outlined" fullWidth />
      )}
    />
    </>
    )
}
    


export default TimeZonePicker