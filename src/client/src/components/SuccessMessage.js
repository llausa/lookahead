import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const SuccessMessage = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  let vertical = 'top'
  let horizontal = 'center'

  return (

    <Snackbar key={`${vertical},${horizontal}`} anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={props.onClose} style={{top: "10vh"}}>
      <Alert onClose={props.onClose} severity="success">
         Success! {props.msg}
        </Alert>
    </Snackbar>
  )
}

export default SuccessMessage