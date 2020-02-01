import React, {useReducer} from "react"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import Background from '../../images/WhiteBackgroundSmall.jpg'
import axios from 'axios'
import ButtonInput from '../ButtonInput'
import FormInput from '../FormInput'
import TitleText from '../TitleText'
import NormalText from '../NormalText'


const AccountDetailsView = () => {

  const [data, setData] = useReducer((state, newState) => (
    {...state, ...newState}
  ), {
    firstName: '',
    lastName: '',
    position: '',
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

    // Client Validation
    const basic = (text) => text.length > 2

    let ButtonText = "Save" 
    let ButtonDisabled = false

    return (
      <>
      <Nav backButtonLink = "/" BackButton={true} MenuButton={true} />
      <CardContainer background={Background}>
      <form onSubmit={onSubmit} className='form'>
        <div data-cy="detailsView" style={mystyle}>
        <TitleText text="Account Details" />
        <NormalText text="Please fill out all required fields" />
        <FormInput type='text' validation={basic} value={data.firstName} onChange={onChange} require={true} errorText="Please enter more Characters" label='First Name' id='firstName' name='firstName'/>
        <FormInput type='text' validation={basic} value={data.lastName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Last Name' id='lastName' name='lastName' />
        <FormInput type='text' value={data.position} onChange={onChange} label='Position' id='position' name='position' />
        <ButtonInput disabled={ButtonDisabled} type='submit' primary={true} color='primary' text={ButtonText} />
        </div>
        </form>
        </CardContainer>
        </>
    )  
}

export default AccountDetailsView