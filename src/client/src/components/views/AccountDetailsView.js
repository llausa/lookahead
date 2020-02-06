import React, {useReducer, useState, useEffect } from "react"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import Background from '../../images/WhiteBackgroundSmall.jpg'
import API from "../../axios.config"
import ButtonInput from '../ButtonInput'
import FormInput from '../FormInput'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import Loader from '../Loader'
import { Button } from '@material-ui/core'
import ErrorMessage from '../ErrorMessage'
import SuccessMessage from '../SuccessMessage'


const AccountDetailsView = (props) => {

  // For Loading Animation
  const [loading, setLoading] = useState(false)

  // For Error Message
  const [errorMessage, setErrorMessage] = useState(null)

  // For Success Message
  const [successMessage, setSuccessMessage] = useState(null)



  const [data, setData] = useReducer((state, newState) => (
    {...state, ...newState}
  ), {
    firstName: '',
    lastName: '',
    position: ''
  })

  useEffect(() => {
    API.get(`api/users/details`)
    .then(res => {
        setData(res.data.user)
    }).catch((err) => {
      props.redirect('/projects')
    })
  }, [])

  const onSubmit = e => {
    e.preventDefault()

    console.log(data)

    API.put(
    '/api/users/details', data)
    .then(function (response) {

      console.log(response)
      setLoading(false)
      setSuccessMessage("Your details have been changed.")
    })
    .catch(function (error) {
        // add error notifications here
        console.log(error.response.data)
        setLoading(false)
        setErrorMessage(error.response.data)
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
      {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}
      {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />}

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