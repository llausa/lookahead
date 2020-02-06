import React, {useReducer, useState, useEffect} from "react"
import API from "../../axios.config"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import DateInput from '../DateInput'
import ButtonInput from '../ButtonInput'
import Background from '../Background'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import TimeZonePicker from '../TimeZonePicker'
import FormInput from '../FormInput'
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import SuccessMessage from '../SuccessMessage'


const EditProjectView = (props) => {
    let today = new Date()
    let minDate = today.setDate(today.getDate() + 1)

    const { projectId } = useParams()

    // For Error Message
    const [errorMessage, setErrorMessage] = useState(null)

    // For Success Message
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        title: '',
        location: '',
        start_date: '',
        end_date: new Date(new Date().setTime( new Date().getTime() + 2 * 86400000 )).toISOString().substring(0, 10),
        create_date: new Date().toISOString().substring(0, 10)
    })

    useEffect(() => {
      API.get(`api/projects/${projectId}`)
      .then(res => {
          setData(res.data.validProject)
    
      }).catch((err) => {
        props.redirect('/projects')
      })
    }, [])

    const onSubmit = e => {
      e.preventDefault()

      console.log(data)

      API.put(
      `/api/projects/${projectId}`, data)
      .then(function (response) {
          console.log(response)
          setSuccessMessage("Your project has been changed.")
      })
      .catch(function (error) {
          console.log(error.response.data)
          setErrorMessage(error.response.data)
      })
    }

    const onChange = e => {
      setData({[e.target.name]: e.target.value})
      console.log(data)
    }

    const onTimeZoneChange = e => {
      setData({"location": e.target.innerText})
    }

    const onDateChange = e => {
        setData({[e.target.name]: e.target.value.toISOString().substring(0, 10)})
    }

    const onDeleteClick = e => {
      e.preventDefault()

      API.delete(
      `/api/projects/${projectId}`)
      .then(function (response) {
          console.log(response)
          props.redirect(`/projects`)
      })
      .catch(function (error) {
          console.log(error.response.data)
          setErrorMessage(error.response.data)
      })
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

    const buttonResetP = {
      color: "#E24921",
      borderColor: "#E24921",
      margin: "10px 10px 20px 10px",
      fontSize: "10px",
      width: "80%",
      alignSelf: "center"
    }

    // Client Validation
    const basic = (text) => text.length > 2

    return (
        <>
        {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}
        {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />}

          <Nav backButtonLink = {`/projects/${projectId}`} BackButton={true} MenuButton={false} />
          <CardContainer background={Background}>
          <form onSubmit={onSubmit} className='form'>
            <div data-cy="newProjectView" style={mystyle}>
                <TitleText text="Edit Project" />
                <NormalText text="Please fill out all required fields" />
                <FormInput type='text' validation={basic} value={data.title} onChange={onChange} require={true} errorText="Please enter more Characters" label='Project Title' id='title' name='title'/>
                <TimeZonePicker defaultVal={(val) => setData(val)} value={data.location} label="Location*" onChange={onTimeZoneChange} id="location" name='location'/>

                {/* <DateInput value={data.start_date} label="Start Date" day={2} id="start_date" onChange={onDateChange} name='start_date' /> */}
                <p>Start Date: {data.start_date.substring(0, 10)}</p>
                <DateInput disablePast minDate={today} value={data.end_date} label="End Date" day={2} id="end_date" onChange={onDateChange} name='end_date' />

                <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Save" />
                <Button variant="outlined" style={buttonResetP}>Delete Project</Button>
            </div>
            </form>
            </CardContainer>
            <Background/>
        </>
    )
}

export default EditProjectView