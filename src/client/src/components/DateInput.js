import 'date-fns'
import React, {useEffect} from "react"
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { withStyles} from '@material-ui/core/styles'

const CssKeyboardDatePicker= withStyles({
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
})(KeyboardDatePicker)

const  MaterialUIPickers = (props) => {


  var tempDate = new Date()
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + (tempDate.getDate()+ props.day) +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds()
  const currDate = "Current Date= "+date

  const [selectedDate, setSelectedDate] = React.useState(props.value || props.minDate )

  useEffect(() => {
    setSelectedDate(props.value)
  }, [props])

  const handleDateChange = date => {
    setSelectedDate(date)
    props.onChange({target: {name: props.name, value: date}})
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <CssKeyboardDatePicker
          disableToolbar
          autoOk
          minDate = { props.minDate }
          maxDate = { props.maxDate }
          required = {true}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id={props.id}
          label={props.label}
          name={props.name}
          size="small"
          style={{width: "100%"}}
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