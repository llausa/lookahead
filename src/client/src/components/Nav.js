import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Menu from './Menu'
import Logo from '../images/LookaheadLogo.svg'
import '../styles.css'


const logoStyle = {
    position: "static",
    height: "30px",
    left: "-5px"
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "0 0 40px 0",
  },
  pos: {
    position: "fixed",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

let menu = false

const HandleBack = () => {
  console.log("We going back boi")
}


const showMenu = (e) => {
  
}

const Nav = (props) => {

  const classes = useStyles()

  return (
    <div>
    <div data-cy="navbar" className={classes.root}>
      <AppBar className={classes.pos} >
        <Toolbar>
        {props.BackButton ? (
          <IconButton component={Link} to={props.backButtonLink} onClick={HandleBack} className={classes.menuButton} color="inherit" aria-label="Back">
            <KeyboardBackspaceIcon/>
          </IconButton>) : (<></>) }
        <img src={Logo} alt="Logo" style={logoStyle} className={classes.title} aria-label="logo"/>
        {props.BackButton ? (
          <IconButton onClick={showMenu} edge="end" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>) : (<></>) }
        </Toolbar>
      </AppBar>
    </div>
    <Menu checked={props.checked}/>
    </div>
  )
}

export default Nav