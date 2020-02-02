import React from "react"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ButtonInput from './ButtonInput'
import Chip from '@material-ui/core/Chip'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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



const UserCard = (props) => {

  

  return (
    <Card  style={CardStyle}>
    <CardContent>
    <div>
      <AccountCircleIcon style={{color: "#006EE2", fontSize: "8rem" }}/>
    </div>
    
    <div style={innerDiv}>
      <h1>{props.title ? (`${props.user}`) : ("User")}</h1>
    </div>
    </CardContent>
    </Card>
  )
}

export default UserCard
