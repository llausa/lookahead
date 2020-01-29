import React from 'react'
import Button from '@material-ui/core/Button';

export default function ButtonInput(props) {

  const Main = {
    color: "#2baafe",
    margin: "20px",
    border: "1px solid rgb(43, 170, 254)"
  }

  const Secondary = {
    color: "rgb(140, 140, 140)",
    margin: "30px 80px",
    fontSize: "8px"
  }

  const main = props.main;
  if (main) {
    return(
      <Button variant="outlined" style={Main} color="primary"></Button>
    )
    
  }
  return (
  <Button variant="outlined" style={Secondary}></Button>
  )
}


