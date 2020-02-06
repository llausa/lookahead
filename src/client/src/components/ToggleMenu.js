import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    marginTop: theme.spacing(2),
    height: 180,
  },
  radioGroup: {
    margin: theme.spacing(0.5, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(1),
      left: theme.spacing(1),
    },
  },
}));





export default function SpeedDials(props) {
  
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up')
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false)

    const EditClicked = () => {
        props.onEdit && props.onEdit()
        console.log("Edit CLicked")
        setOpen(false)
    }

    const DeleteClicked = () => {
        props.onDelete && props.onDelete()
        console.log("Delete CLicked")
        setOpen(false)
    }
    

const actions = [
  { icon: <EditIcon/>, name: 'Edit', function: (() => EditClicked()) },
  { icon: <DeleteIcon />, name: 'Delete', function: (() => DeleteClicked()) },
];

  const handleDirectionChange = event => {
    setDirection(event.target.value)
  }

  const handleHiddenChange = event => {
    setHidden(event.target.checked)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={classes.root} style={{position: "absolute", zIndex: "70"}}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="Menu"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="right"
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="bottom"
              onClick={action.function}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}