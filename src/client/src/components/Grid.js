import React, { useState, useEffect } from 'react';
import '../resizable.css'
import '../grid-layout.css'
import { Responsive as ResponsiveGridLayout, ToolBox } from 'react-grid-layout'
import GridLayout  from 'react-grid-layout'
import { useParams } from 'react-router-dom'
import API from "../axios.config"
import Button from '../components/ButtonUserInput'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import DeleteIcon from '@material-ui/icons/Delete'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment-timezone'

export default function Grid(props) {

  const [layout, setLayout] = useState([])

  const [currentTimeLine, setCurrentTimeLine] = useState({days: -1, hours: -1, mins: -1})

  const [errorMessage, setErrorMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  const { projectId } = useParams()

  const [project, setProject] = useState(null)

  useEffect(() => {
    API.get(
      `api/projects/${projectId}/`
    )
    .then(res => {
      setLayout(fromDatabase(res.data.validProject.tasks))
      let projectStart = new Date(res.data.validProject.start_date)
      calculateTime(projectStart)

    }).catch((err) => {
      console.log(err)
      props.redirect('/projects')
    })
  }, [])

  const fromDatabase = (layout) => {

    return layout.map((obj, i) => (
      {
        ...obj,
        i: i.toString(),
        w: 1,
        h: obj.length,
        y: obj.start_time,
        x: obj.day,
        maxW: 1
      }
    ))
  }

  const toDatabase = (layout) => {
    return layout.map(obj => (
      {
        _id: obj._id,
        length: obj.h,
        start_time: obj.y,
        day: obj.x,
        title: obj.title,
        description: obj.description,
        complete: obj.complete
      }
    ))
  }


  const updateDatabase = async (newLayout) => {
    return API.put(
      `/api/projects/${projectId}/tasks/edit`,
      {tasks: toDatabase(newLayout)}
    )
    .then((res) => {
      setLayout(newLayout)
      // setSuccessMessage(res.data.message)
    })
    .catch((err) => {
      reDraw()
      // setErrorMessage(err.data.message)
    })
  }

  const validate = (items) => {
    for(let item of items) {
      if (item.y + item.h > 24) {
        return false
      }
    }
    return true
  }

  const reDraw = () => {
    let lastKey = parseInt(layout[layout.length-1].i)
    let newLayout = layout.map((obj, i) => {
      obj.i = (parseInt(lastKey) + i + 1).toString()
      return {...obj}
    })
    setLayout(newLayout)
  }

  const stopDrag = (items) => {
    if(!validate(items)) {
      reDraw()
    } else {
      let newItems = items.map((item, i) => (
        {
          ...layout[i],
          ...item
        }
      ))
      updateDatabase(newItems)

    }
  }

  const addItem = () => {
    API.put(
      `api/projects/${projectId}/tasks`,
      {
        "title": "Build House",
        "start_time": 0,
        "length": 1,
        "day": 0,
        "description": "Big Yeet"
      }
    )
    .then(res => {
      let newTask = fromDatabase([res.data.newTask])[0]
      newTask.i = (layout.reduce((acc, val) => val.i > acc ? val.i : acc, 0) + 1).toString()
      setLayout([...layout, newTask])
    }).catch((res) => {
      console.log(res)
      //flash error message
      // props.redirect('/projects')

    })
  }

  const removeItem = (taskId) => {
    {console.log(taskId)}
    API.delete(
      `api/projects/${projectId}/tasks/${taskId}`
    )
    .then(res => {
      setLayout(layout.filter(el => el._id != taskId))
      // Flash Task Deleted
    }).catch((res) => {
      console.log(res)
      //flash error message
      // props.redirect('/projects')

    })
  }

  const numberOfDays = (proj) => {
    if(!proj){return 0}
    let end_date = new Date(proj.end_date)
    let start_date = new Date(proj.start_date)

    let differenceInTime = end_date.getTime() - start_date.getTime()
  }

  function getTimeToTable(tableStart) {
    let time = new Date() - tableStart
    time -= new Date(time).getTimezoneOffset() * 60 * 1000
    let days = Math.floor(time / 1000 / 60 / 60 / 24)
    time -= days * 24 * 60 * 60 * 1000
    let hours = Math.floor(time / 1000 / 60 / 60)
    time -= hours * 60 * 60 * 1000
    let mins = Math.floor(time / 1000 / 60)
    return {days: days, hours: hours, mins: mins / 60 * 100}
  }

  const sleep = time => new Promise(r => setTimeout(r, time))

  async function calculateTime(projectStart) {
    setCurrentTimeLine(getTimeToTable(projectStart))

    await sleep(1000 * 60)
    calculateTime(projectStart)
  }


  let numberOfDays = 6
  let totalWidth = (numberOfDays * 200)

    // To calculate the no. of days between two dates
    let numberOfDays = differenceInTime / (1000 * 3600 * 24)

    return numberOfDays
  }

  const tableStyle = {
    borderCollapse: "collapse",
    position: "relative",
    height: `${24*50}px`,
    width: `${numberOfDays(project) * 200}px`,
    border: "1px solid black",
    top: "0",
    left: "0",
    zIndex: "-1",
  }

  const Formatting = (props) => {

    let startTime = ''

    if (props.y < 10) {
      startTime = ("0" + props.y + ":00")
    } else {
      startTime = (props.y + ":00")
    }

    return (
      <div style={props.complete ? completed : notComplete }>
        <p style={{color: "#006EE3", fontWeight: "bold"}}>{props.title}</p>
        <p>{props.description}</p>
        <p><QueryBuilderIcon style={{fontSize: "1rem", position: "relative", top: "2px", margin: "0 4px 0 0"}}/>{startTime}</p>
        <p>{props.h} Hours</p>
      </div>
    )
  }

      // Styling
    const completed = {

    }

    const notComplete = {

    }

  return (

      project ? (
       < div style={{position: "relative"}}>
        {console.log(numberOfDays(project) * 200)}
      {/* {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />} */}
      {/* {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />} */}
      <Button onClick={addItem} text="Add" />
      <GridLayout onResizeStop={stopDrag} onDragStop={stopDrag} verticalCompact={false} className="layout" cols={numberOfDays(project)} maxRows={24} rowHeight={50} width={numberOfDays(project) * 200} margin={[0, 0]}>
        {layout.map((grid, i) => (
          <div key={grid.i} data-grid={grid} >
          <Tooltip title="Delete Task" placement="top" arrow>
            <DeleteIcon onClick={() => removeItem(grid._id)} className="deleteButton"/>
            </Tooltip>
            <Formatting {...grid} />
          </div>
        ))}
      </GridLayout>
      <div style={{position: 'relative', pointerEvents: 'none'}}>
        <table border="1" style={tableStyle}>
          {Array(24).fill().map(_ => (
            <tr>
              {Array(numberOfDays).fill().map(_ => (
                <td>
                </td>
              ))}
            </tr>
          ))}
        </table>
        <table style={{...tableStyle, border: 'none', zIndex: 9999, position: 'absolute'}} cellspacing="0" cellpadding="0">
          {Array(24).fill().map((_, i) => (
            <tr>
              {Array(numberOfDays).fill().map((_, j) => (
                <td>
                  {i === currentTimeLine.hours && j === currentTimeLine.days && (
                    <div style={{height: '100%'}}>
                      <div style={{top: `${currentTimeLine.mins}%`, height: '2px', opacity: '0.7', width: '100%', position: 'relative', backgroundColor: 'red'}}></div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
    ) : (<></>)
  )
}
