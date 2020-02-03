import React from "react"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NormalText from '../NormalText'
import Nav from '../Nav'
import CardContainer from '../CardContainer'
import Background from '../Background'
import UserRolePicker from '../UserRolePicker'
import Button from '@material-ui/core/Button'


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

  const buttonResetP = {
    color: "#E24921",
    borderColor: "#E24921",
    margin: "10px 10px 20px 10px",
    fontSize: "14px"
}


const ProjectUserSettingsView = (props) => {

    

    return (
        <>
        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
        <CardContainer background={Background}>
        <form className='form'>
        
        <div style={{display: "flex"}}>
          <div style={{margin: "auto", maxWidth: "100px"}}>
            <AccountCircleIcon style={{color: "#006EE2", fontSize: "8rem" }}/>
          </div>
          
          <div style={innerDiv}>
            <h1 style={{margin: "10px"}}>{props.user ? (`${props.user}`) : ("User")}</h1>
            <NormalText text={"Position: " + props.userPosition} style={{margin: 0}}/>
            <NormalText text={"Email: " + props.userEmail} style={{margin: 0}}/>
    
          </div>
        </div>

        <div style={{minHeight: "20vh"}}>
            <h1>User Privileges</h1>
            <div style={{margin: " 0 40px 40px 40px"}}><UserRolePicker/></div>
            <NormalText text="Would you like to remove this user from this Project?" />
            <Button variant="outlined" style={buttonResetP}>Remove User </Button>
        </div>
        
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default ProjectUserSettingsView