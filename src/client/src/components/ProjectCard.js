import React from "react"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ButtonInput from './ButtonInput'
import Chip from '@material-ui/core/Chip'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import LocationOnIcon from '@material-ui/icons/LocationOn'


const innerDiv = {
  display: 'flex',
  flexDirection: 'column',
  alignitems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#006EE2',
  padding: '10px',
  maxWidth: '400px',
  margin: 'auto',
}

const CardStyle = {
  margin: "20px",
  width: "90vw",
  height: "auto",
  maxWidth: "500px",
  alignSelf: "center",
  borderRadius: "25px"
}

const chipStyle = {
  margin: "0px",
  padding: "0px",
  width: "40%",
  backgroundColor: "white",
  color: "#006EE2",
}

const chipStyle2 = {
  margin: "20px",
  padding: "0px",
  fontSize: "20px",
  backgroundColor: "white",
  color: "#006EE2",
}


const ProjectCard = (props) => {

  

  return (
    <Card  style={CardStyle}>
    <CardContent>
    <div style={innerDiv}>
      <h1>{props.title ? (`${props.title}`) : ("Project")}</h1>
      <div>
      <Chip
        style={chipStyle}
        icon={<CalendarTodayIcon />}
        label={(props.startDate ? (`${props.startDate}`) : ("01/02/20"))}
      />
      < ArrowRightIcon style={{fontSize: "2rem", position: "relative", top: "10px"}}/>
      <Chip
        style={chipStyle}
        icon={<EventAvailableIcon />}
        label={(props.endDate ? (`${props.endDate}`) : ("10/02/20"))}
      />
      </div>
      <Chip
        style={chipStyle2}
        icon={<LocationOnIcon />}
        label={(props.location ? (`${props.location}`) : ("Brisbane, Australia"))}
      />
      <ButtonInput onClick={console.log("Event Clicked")} primary={true} color='primary' text="View" />
    </div>
    </CardContent>
    </Card>
  )
}

export default ProjectCard


{/* <Typography variant="h5" component="h2">
  Project #1
</Typography>
<Typography className={classes.pos} color="textSecondary">
  Created by You
</Typography>
<Typography variant="body2" component="p">
  This is the project summary...
</Typography>
<br />
<Button size="small">View</Button> */}