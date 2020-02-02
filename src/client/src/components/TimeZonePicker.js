import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import momentTZ from 'moment-timezone';


const TimeZonePicker = (props) => {
    return (
        <>
        <Autocomplete
      id="combo-box-demo"
      style={{margin: "4px"}}
      size="small"
      options={TimeZones}
      getOptionLabel={option => option.names}
      renderInput={params => (
        <TextField {...params} label={props.label} variant="outlined" fullWidth />
      )}
    />
    </>
    )
}

const TimeZones = momentTZ.tz.names()

export default TimeZonePicker