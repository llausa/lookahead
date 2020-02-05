import React, {useReducer, useState} from "react"
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


const EditProjectView = () => {

    // For Error Message
    const [errorMessage, setErrorMessage] = useState(null)

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        title: '',
        location: '',
        start_date: '',
        end_date: '',
        create_date: ''
      })

      const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.post(
        '/api/users', data)
        .then(function (response) {

            console.log(response)
        })
        .catch(function (error) {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
        })

        }

      const onChange = e => {
        setData({[e.target.name]: e.target.value})
        console.log(data)
        // setData({"location": location.value})
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

    const { projectId } = useParams()

    // Client Validation
    const basic = (text) => text.length > 2

    let startDate = "12/02/20"

    return (
        <>
        {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}

          <Nav backButtonLink = {`/projects/${projectId}`} BackButton={true} MenuButton={false} />
          <CardContainer background={Background}>
          <form onSubmit={onSubmit} className='form'>
            <div data-cy="newProjectView" style={mystyle}>
                <TitleText text="Edit Project" />
                <NormalText text="Please fill out all required fields" />
                <FormInput type='text' validation={basic} value={data.projectTitle} onChange={onChange} require={true} errorText="Please enter more Characters" label='Project Title' id='projectTitle' name='projectTitle'/>
                <TimeZonePicker defaultVal={(val) => setData(val)} label="Location*" id="location" name='location'/>
                <p>Start Date: {startDate}</p>
                <DateInput label="End Date" day={2} id="endDate" name='endDate' />
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