import React, { useState, useEffect, useRef } from 'react';
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
import ToggleMenu from './ToggleMenu'
import moment from 'moment-timezone'
import TimeArrow from '../images/TimeArrow.svg'


export default function Grid(props) {

  const [layout, setLayout] = useState([])

  const [currentTimeLine, setCurrentTimeLine] = useState({days: -1, hours: -1, mins: -1})

  const [currentTime, setCurrentTime] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  const { projectId } = useParams()

  const [project, setProject] = useState(null)

  useEffect(() => {
    scrollDiv.current.addEventListener('scroll', e => {
      fixedTable.current.style.left = `${e.target.scrollLeft}px`
    })
    API.get(
      `api/projects/${projectId}/`
    )
    .then(res => {
      setProject(res.data.validProject)
      setLayout(fromDatabase(res.data.validProject.tasks))
      let projectStart = new Date(res.data.validProject.start_date)
      let ProjectTimeZone = res.data.validProject.location
      calculateTimeZone(ProjectTimeZone)
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
    // To calculate the no. of days between two dates
    let numberOfDays = differenceInTime / (1000 * 3600 * 24)

    return numberOfDays
  }

  let NewTime = ''
  let OffSet = ''

  function calculateTimeZone(ProjectTimeZone){
    console.log(moment.tz(ProjectTimeZone).format())
    NewTime = parseInt(moment.tz(ProjectTimeZone).format('Z'))
    OffSet = NewTime.substring(0, 3)
    console.log(OffSet)
    console.log(NewTime)
  }

  function calcTime(offset) {

    // create Date object for current location
    var d = new Date()
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000)

    // using supplied offset
    var nd = new Date(utc + (3600000*offset))
    // return time as a string
    return nd
  }

  function getTimeToTable(tableStart) {

    let time = calcTime(OffSet) - tableStart

    time -= new Date(time)  * 60 * 1000
    console.log(time)
    let days = Math.floor(time / 1000 / 60 / 60 / 24)
    time -= days * 24 * 60 * 60 * 1000
    let hours = Math.floor(time / 1000 / 60 / 60)
    time -= hours * 60 * 60 * 1000


    let mins = Math.floor(time / 1000 / 60)
    console.log()
    return {days: days, hours: hours, mins: mins / 60 * 100}
  }

  const sleep = time => new Promise(r => setTimeout(r, time))

  async function calculateTime(projectStart) {
    setCurrentTimeLine(getTimeToTable(projectStart))

    await sleep(1000 * 60)
    calculateTime(projectStart)
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
      <div className="MenuButtonStyle">
        <ToggleMenu onDelete={() => removeItem(props._id)} />
        </div>
        <p className="TaskTitle" >{props.title}</p>
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

    const fixedTable = useRef(null)
    const scrollDiv = useRef(null)

  return (
    // Creates grid of all Project Tasks
    <>
    <div ref={scrollDiv} style={{overflowX: "scroll", position: 'relative', color: '#006EE2'}}>
    <table border="1" ref={fixedTable} style={{...tableStyle, position: 'absolute', zIndex: 2, top: 'auto', border:'1px solid #006EE2', width: 'auto', backgroundColor: 'rgba(239, 239, 239, 0.9)'}}>
      <tbody>
        {Array(25).fill().map((_, i) => (
          <tr>
            <td>{`${i < 10 ? '0' : ''}${i}:00`}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{position: "relative", marginLeft: "50px"}} >
      {/* {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />} */}
      {/* {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />} */}

      <Button onClick={addItem} text="Add" />
      <GridLayout onResizeStop={stopDrag} onDragStop={stopDrag} verticalCompact={false} className="layout" cols={numberOfDays(project)} maxRows={24} rowHeight={50} width={numberOfDays(project) * 200} margin={[0, 0]}>
        {layout.map((grid, i) => (
          <div key={grid.i} data-grid={grid} >
          
          {/* <Tooltip title="Delete Task" placement="top" arrow>
            <DeleteIcon onClick={() => removeItem(grid._id)} className="deleteButton"/>
            </Tooltip> */}
            <Formatting {...grid} />
          </div>
        ))}
      </GridLayout>

      {/* Creates Faded Background Grid */}
      <div style={{position: 'relative', pointerEvents: 'none'}}>
        <table border="1" style={tableStyle}>
          <tbody>
          {Array(24).fill().map(_ => (
            <tr>
              {Array(numberOfDays(project)).fill().map(_ => (
                <td>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
         {/* Creates Red line through view to show time */}
        <table style={{...tableStyle, border: 'none', zIndex: 69, position: 'absolute'}} cellspacing="0" cellpadding="0">
          <tbody>
          {Array(24).fill().map((_, i) => (
            <tr>
              {Array(numberOfDays(project)).fill().map((_, j) => (
                <td>
                  {i === currentTimeLine.hours && (
                    <div style={{height: '100%', position: 'relative'}}>
                      <div style={{top: `${currentTimeLine.mins}%`, height: '4px', opacity: '0.4', width: '100%', position: 'relative', backgroundColor: 'red'}}></div>
                      {j === 0 && (
                        <div style={{top: `${currentTimeLine.mins}%`, position: 'absolute', transform: 'translate(-100%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                          <img style={{width: '60px', height: 'auto', top: '2px', left: "2px", position: 'relative'}} src={TimeArrow} />
                          <p style={{position: 'absolute', zIndex: 2, margin: 0, top: '6px', color: "white"}}>{`${currentTimeLine.hours < 10 ? '0' : ''}${Math.floor(currentTimeLine.hours)}:${currentTimeLine.mins * 60 / 100 < 10 ? '0' : ''}${Math.floor(currentTimeLine.mins * 60 / 100)}`}</p>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  )
}
