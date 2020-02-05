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
import ErrorMessage from '../ErrorMessage'


const NewProjectView = (props) => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        title: '',
        location: '',
        start_date: new Date(new Date().setTime( new Date().getTime() + 1 * 86400000 )).toISOString().substring(0, 10),
        end_date: new Date(new Date().setTime( new Date().getTime() + 2 * 86400000 )).toISOString().substring(0, 10),
        create_date: new Date().toISOString().substring(0, 10)
      })

      // For Error Message
      const [errorMessage, setErrorMessage] = useState(null)

      const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.post('/api/projects', data)
        .then(function (response) {
          props.redirect(`/projects/${response.data.id}`)
        })
        .catch(function (error) {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
        })

      }

      const onChange = e => {
        setData({[e.target.name]: e.target.value})
        setData({"create_date": new Date().toISOString().substring(0, 10)})
        console.log(data)
      }

      const onTimeZoneChange = e => {
        setData({"location": e.target.innerText})
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
        {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}

        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
        <CardContainer background={Background}>
        <form onSubmit={onSubmit} className='form'>
          <div data-cy="newProjectView" style={mystyle}>
              <TitleText text="New Project" />
              <NormalText text="Please fill out all required fields" />
              <FormInput type='text' validation={basic} value={data.title} onChange={onChange} require={true} errorText="Please enter more Characters" label='Project Title' id='title' name='title'/>
              <TimeZonePicker defaultVal={(val) => setData(val)} label="Location*" id="location" value={data.location} name='location' onChange={onTimeZoneChange} />
              <DateInput label="Start Date" day={1} id="start_date" value={data.start_date} name='start_date' onChange={onDateChange}/>
              <DateInput label="End Date" day={2} id="end_date" value={data.end_date} name='end_date' onChange={onDateChange} />
              <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Create" />
          </div>
          </form>
          </CardContainer>
          <Background/>
        </>
    )
}

export default NewProjectView