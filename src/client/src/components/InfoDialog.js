import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const InfoDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const SmallText = {
    color: "#C4C4C4",
    fontSize: "12px",
    fontWeight: "strong",
    cursor: "pointer",
    textDecoration: "underline",
    backgroundColor: "none"
  }

  return (
    <div>
      <p style={SmallText} onClick={handleClickOpen}>
        Password Requirements
        </p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Password Requirements"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your password must contain 1 uppercase and 1 lowercase letter as well a number with a minimum length of 8 characters.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InfoDialog