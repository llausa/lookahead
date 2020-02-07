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
          setData(res.data.validTask)
          
    
        }).catch((err) => {

          setEdit(props.edit)

        })
      }, [])



    const onSubmit = e => {

        delete(data._id)
        delete(data.complete)
       
        e.preventDefault()

        API.put(
        `/api/projects/${projectId}/tasks/${taskId}`, data)
        .then(function (response) {
         
            props.redirect(`/projects/${projectId}`)

        })
        .catch(function (error) {

        })

    }

    const onChange = e => {
        setData({[e.target.name]: e.target.value})
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
            <TitleText text="Edit Task" />
            <NormalText text="Please fill out all required fields" />
            <FormInput type='text' validation={basic} value={data.title} onChange={onChange} require={true} errorText="Please enter more Characters" label='Task Name' id='title' name='title' />
            <FormInput type='text' validation={basic} value={data.description} onChange={onChange} require={false} multiline={true} label='Task Description' id='description' name='description' />
            <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Save" />
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