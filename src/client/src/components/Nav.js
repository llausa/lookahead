import React from 'react'

import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'

import Logo from '../images/LookaheadLogo.svg'
import '../styles.css'

const logoStyle = {
    position: "relative",
    height: "30px",
    left: "25px"
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <img src={Logo} alt="Logo" style={logoStyle} className={classes.title} aria-label="logo"/>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}