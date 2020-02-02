import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const  MaterialUIPickers = (props) => {


  var tempDate = new Date()
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + (tempDate.getDate()+ props.day) +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds()
  const currDate = "Current Date= "+date
    


  const [selectedDate, setSelectedDate] = React.useState(new Date(currDate))

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          required = {true}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id={props.id}
          label={props.label}
          size="small"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  )
}

export default MaterialUIPickers