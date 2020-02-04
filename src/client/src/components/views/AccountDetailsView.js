import React, {useReducer, useState } from "react"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import Background from '../../images/WhiteBackgroundSmall.jpg'
import API from "../../axios.config"
import ButtonInput from '../ButtonInput'
import FormInput from '../FormInput'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import Loader from '../Loader'


const AccountDetailsView = () => {

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODA4NzMyMjUsIl9pZCI6IjVlMzhlNDg5MjY3YzU5N2ZjZjA0MGMxMyIsImlhdCI6MTU4MDc4NjgyNX0.tdMPswUn4DD9nOE5CKQLSGY__8aKWLCU9yp2DbwoxcM'

  // For Loading Animation
  const [loading, setLoading] = useState(false)

  const [data, setData] = useReducer((state, newState) => (
    {...state, ...newState}
  ), {
    "firstName": '',
    "lastName": '',
    "position": ''
  })

  const onSubmit = e => {
    e.preventDefault()

    console.log(data)

    API.post(
    '/api/users', data)
    .then(function (response) {
      localStorage.setItem('authToken', response.data.token)
      console.log(response)
    })
    .catch(function (error) {
        // add error notifications here
        console.log(error.response.data)
        setLoading(false)
    })

  }

  const onChange = e => setData({[e.target.name]: e.target.value})

    const mystyle = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#006EE2",
        padding: "10px",
        maxWidth: "400px",
        margin: "auto",
    }

    const SubmitPressed = ()  => {
        console.log("Submit Pressed")
        setLoading(true)
    }

    // Client Validation
    const basic = (text) => text.length > 2

    let ButtonText = "Save"
    let ButtonDisabled = false

    return (
      <>
      <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
      <CardContainer background={Background}>
      <form onSubmit={onSubmit} className='form'>
        <div data-cy="detailsView" style={mystyle}>
        <TitleText text="Account Details" />
        <NormalText text="Please fill out all required fields" />
        <FormInput type='text' validation={basic} value={data.firstName} onChange={onChange} require={true} errorText="Please enter more Characters" label='First Name' id='firstName' name='firstName'/>
        <FormInput type='text' validation={basic} value={data.lastName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Last Name' id='lastName' name='lastName' />
        <FormInput type='text' value={data.position} onChange={onChange} label='Position' id='position' name='position' />
        <ButtonInput disabled={ButtonDisabled} type='submit' onclick={SubmitPressed} primary={true} color='primary' text={ButtonText} />
        </div>
        </form>
        </CardContainer>
        </>
    )
}

export default AccountDetailsView