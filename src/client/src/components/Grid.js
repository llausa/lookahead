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

export default function Grid(props) {

  const [layout, setLayout] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  const { projectId } = useParams()

  useEffect(() => {
    API.get(
      `api/projects/${projectId}/`
    )
    .then(res => {
      setLayout(fromDatabase(res.data.validProject.tasks))
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
      setLayout(fromDatabase(res.data.validProject.tasks))
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
    }).catch((res) => {
      console.log(res)
      //flash error message
      // props.redirect('/projects')
      
    })
  }


  let numberOfDays = 6
  let totalWidth = (numberOfDays * 200)

  const tableStyle = {

    borderCollapse: "collapse",
    position: "relative",
    height: `${24*50}px`,
    width: `${totalWidth}px`,
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
        <p>title: {props.title}</p>
        <p>description: {props.description}</p>
        <p>{startTime}</p>
        <p>{props.length} Hours</p>
      </div>
    )
  }

      // Styling
    const completed = {
      
    }

    const notComplete = {
      
    }

  return (
    
       < div style={{position: "relative"}}>
      {/* {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />} */}
      {/* {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />} */}
      <Button onClick={addItem} text="Add" />
      <GridLayout onResizeStop={stopDrag} onDragStop={stopDrag} verticalCompact={false} className="layout" cols={numberOfDays} maxRows={24} rowHeight={50} width={totalWidth} margin={[0, 0]}>
        {layout.map((grid, i) => (
          <div key={grid.i} data-grid={grid} >
            <DeleteIcon onClick={() => removeItem(grid._id)} className="deleteButton"/>
            <Formatting {...grid} />
          </div>
        ))}
      </GridLayout>
      <table border="1" style={tableStyle}>
        {Array(24).fill().map(_ => (
          <tr>
            {Array(numberOfDays).fill().map(_ => (
              <td></td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}


