import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    border: "1px solid black",
    margin: "10px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})


function ProjectCard() {

    const classes = useStyles()

        return (
          <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              Project #1
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Created by You
            </Typography>
            <Typography variant="body2" component="p">
              This is the project summary...
            </Typography>
            <br />
            <Button size="small">View</Button>
          </CardContent>
        </Card>
        )
}

export default ProjectCard