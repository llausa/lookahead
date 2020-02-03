import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Menu from './Menu'
import Logo from '../images/LookaheadLogo.svg'
import '../styles.css'
import { HamburgerElastic } from 'react-animated-burgers'


const logoStyle = {
    position: "center",
    height: "30px",
    left: "-5px"
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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

const Invisible = {
  opacity: 0,
  pointerEvents: "none",
}

const HandleBack = () => {
  console.log("We going back boi")
}

const Nav = (props) => {

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }


  const classes = useStyles()

  return (
    <div style={{overflow: "hidden"}}>
    <div data-cy="navbar" className={classes.root}>
      <AppBar className={classes.pos} >
        <Toolbar>
        {props.BackButton ? (
          <IconButton component={Link} to={props.backButtonLink} onClick={HandleBack} className={classes.menuButton} color="inherit" aria-label="Back">
            <KeyboardBackspaceIcon/>
          </IconButton>) : (
            <IconButton className={classes.menuButton} style={Invisible} color="inherit">
            <KeyboardBackspaceIcon/>
          </IconButton>) }
        <img src={Logo} alt="Logo" style={logoStyle} className={classes.title} aria-label="logo"/>
        {props.MenuButton ? (
          <HamburgerElastic isActive={open? (true) : (false)} onClick={handleClick} edge="end" buttonWidth={20} barColor="white"/>
          ) : (
            <IconButton edge="end" className={classes.menuButton} style={Invisible} color="inherit" >
            <MenuIcon />
          </IconButton>) }
        </Toolbar>
      </AppBar>
    </div>
    <Menu className={open ? 'MenuOpen' : 'MenuClosed'} />
    <div style={{position: "relative", height: "50px"}}></div>
    </div>
    
  )
}

export default Nav