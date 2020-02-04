import React from "react"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NormalText from './NormalText'
import ButtonUserInput from "./ButtonUserInput"


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
    <div style={{display: "flex"}}>
      <div style={{margin: "auto", maxWidth: "100px"}}>
        <AccountCircleIcon style={{color: "#006EE2", fontSize: "8rem" }}/>
      </div>
      
      <div style={innerDiv}>
        <h1 style={{margin: "10px"}}>{props.user ? (`${props.user}`) : ("User")}</h1>
        <NormalText text={props.userPrivilege ? ("Privileges: " + props.userPrivilege) : (<></>)} style={{margin: 0}}/>
        <NormalText text={"Position: " + props.userPosition} style={{margin: 0}}/>
        <NormalText text={"Email: " + props.userEmail} style={{margin: 0}}/>
        <p style={{opacity: 1, margin: 0}}>{props.userId}</p>
        {props.userEdit ? (<ButtonUserInput text="Edit User"/>) : (<ButtonUserInput onClick={props.onClick} add={true} text="Add User"/>)}
      </div>
    </div>
    </CardContent>
    </Card>
  )
}

export default UserCard
