import React, {useReducer, useEffect, useState } from "react"
import API from "../axios.config"
import CardContainer from './CardContainer'
import DateInput from './DateInput'
import ButtonInput from './ButtonInput'
import TitleText from './TitleText'
import NormalText from './NormalText'
import DurationPicker from './DurationPicker'
import TimePicker from './TimePicker'
import FormInput from './FormInput'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const EditTaskOverlay = (props) => {
    const classes = useStyles();

    const { projectId, taskId } = useParams()

    const [edit, setEdit ] = useState()

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        title: '',
        description: '',
        day: '',
        length: '',
        start_time: ''
      })


    useEffect(() => {
        API.get(
          `api/projects/${projectId}/tasks/${taskId}`
        )
        .then(res => {
          
          setEdit(props.edit)
          setData(res.data.task)
    
        }).catch((err) => {

          setEdit(props.edit)

          console.log(err)
          // props.redirect('/projects')
        })
      }, [])



    const onSubmit = e => {

        // setData(data)
        e.preventDefault()

        data.day = (new Date(data.day).getTime() - new Date(props.project.start_date).getTime()) / (1000 * 3600 * 24) + 1

        console.log(data.day)
        console.log(props.project.start_date)

        // data.day = data.day - project.start_date

        console.log(data)

        API.put(
        `/api/projects/${projectId}/tasks`, data)
        .then(function (response) {

            console.log(response)
        })
        .catch(function (error) {
            console.log(error.response.data)
        })

    }

    const onChange = e => {
        setData({[e.target.name]: e.target.value})
        // console.log(data)
        // setData({"location": location.value})
    }

    const onTimeChange = e => {
      console.log(e.target)
      setData({'start_time': parseInt(e.target.innerHTML)})
    }

    const onDurationChange = e => {
      console.log(e.target)
    setData({'length': parseInt(e.target.innerHTML)})
    }

    const onDateChange = e => {
      setData({[e.target.name]: e.target.value.toISOString().substring(0, 10)})
  }

    const mystyle = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        maxWidth: "400px",
        margin: "auto",
    }

    // Client Validation
    const basic = (text) => text.length > 2

    return (
        <>
      <div style={props.style}>
      <Backdrop className={classes.backdrop} open={true}>
      <div style={{position: "absolute", zIndex: "6", height: "100vh", width: "100vw"}}>
      <CardContainer style={{zIndex: "6"}} >
      <form onSubmit={onSubmit} className='form'>
        <div data-cy="newProjectView" style={mystyle}>
            <TitleText text={ edit ? ("Edit Task") : ("New Task")  } />
            <NormalText text="Please fill out all required fields" />
            <FormInput type='text' validation={basic} value={data.title} onChange={onChange} require={true} errorText="Please enter more Characters" label='Task Name' id='title' name='title' />
            <FormInput type='text' validation={basic} value={data.description} onChange={onChange} require={false} multiline={true} label='Task Description' id='description' name='description' />

            <DateInput minDate={props.project.start_date} maxDate={props.project.end_date} value={data.day} label="End Date" day={1} id="end_date" onChange={onDateChange} name='day' />

            <TimePicker  onChange={onTimeChange} value={data.start_time} label="Start Time*" id="start_time" name='start_time' style={{width: "100%"}}/>
            <DurationPicker  onChange={onDurationChange} value={data.length} label="Duration (hours)*" id="length" name='length' style={{width: "100%"}}/>

            <ButtonInput disabled={false} type='submit' primary={true} color='primary' text={ props.edit? ("Save") : ("Create") } />
        </div>
        </form>
        </CardContainer>
        </div>
        <div className="blackOverlay" ></div>
        </Backdrop>
        </div>
        </>

    )
}

export default EditTaskOverlay