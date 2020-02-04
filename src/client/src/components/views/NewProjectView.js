import React, {useReducer} from "react"
import axios from 'axios'
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import DateInput from '../DateInput'
import ButtonInput from '../ButtonInput'
import Background from '../Background'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import TimeZonePicker from '../TimeZonePicker'
import FormInput from '../FormInput'


const NewProjectView = () => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        projectTitle: '',
        location: '',
        startDate: '',
        endDate: ''
      })
    
      const onSubmit = e => {
        e.preventDefault()
    
        console.log(data)
    
        axios.post(
        'https://vast-oasis-18718.herokuapp.com/api/users', data)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error.response.data)
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
    
    // Client Validation
    const basic = (text) => text.length > 2

    return (
        <>
      <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
      <CardContainer background={Background}>
      <form onSubmit={onSubmit} className='form'>
        <div data-cy="newProjectView" style={mystyle}>
            <TitleText text="New Project" />
            <NormalText text="Please fill out all required fields" />
            <FormInput type='text' validation={basic} value={data.projectTitle} onChange={onChange} require={true} errorText="Please enter more Characters" label='Project Title' id='projectTitle' name='projectTitle'/>
            <TimeZonePicker label="Location*" id="location" name='location'/>
            <DateInput label="Start Date" day={1} id="startDate" name='startDate'/>
            <DateInput label="End Date" day={2} id="endDate" name='endDate' />
            <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Create" />
        </div>
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default NewProjectView