import React, { useReducer, useState } from 'react'
import API from "../../axios.config"
import ButtonInput from '../ButtonInput'
import FormInput from '../FormInput'
import InfoDialog from '../InfoDialog'
import CardContainer from '../CardContainer'
import Background from '../Background'
import Nav from '../Nav'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import Loader from '../Loader'
import NotificationMessage from '../NotificationMessage'

const Signup = (props) => {

    // For Loading Animation
    const [loading, setLoading] = useState(false)

    // For Error Message
    const [errorMessage, setErrorMessage] = useState(null)

    // for checking passwords matchy matchy
    const [passwordConfirmation, setPasswordConfirmation] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        passwordConfirmation: '',
    })
    
    // Data for signup submit
    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: '',
    })

    // Api call etc
    const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.post(
        '/api/users', data)
        .then(function (response) {
            console.log(response)
            setLoading(false)
            if (response.status === 201) {
                
                props.redirect('/projects')
            }
        })
        .catch(function (error) {
            // console.log(error.response.data)
            // console.log(error)
            setLoading(false)
            setErrorMessage(error.response.data)
        }) }
    
        // Updates values on change
        const onChange = e => setData({[e.target.name]: e.target.value})
        const passwordConfirmChange = e => setPasswordConfirmation({[e.target.name]: e.target.value})
    
        // Styling
        const mystyle = {
            display: 'flex',
            flexDirection: 'column',
            alignitems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#006EE2',
            padding: '10px',
            maxWidth: '400px',
            margin: 'auto',
        }

        // Client Validation
        const basic = (text) => text.length > 2
        const email = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
        const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1000}$/)
        const passwordFinal = (text) => text === data.password

        // Signup Button pressed inits loading and submits form
        const SignupPressed = ()  => {
            console.log("Signup Pressed")
            setLoading(true)
        }

        // Checks all required fields are valid to enable the submit button
        const isValid = () => {
            return !!basic(data.lastName) && !!basic(data.lastName) && !!email(data.email) && !!password(data.password) && !!password(data.password) && !!passwordFinal(passwordConfirmation.passwordConfirmation)
        }

      return (

        <>
        {errorMessage && <NotificationMessage error={errorMessage.message} onClose={() => setErrorMessage(null)} />}
        <Nav backButtonLink = "/" BackButton={true} MenuButton={false} />
        <CardContainer background={Background}>
        <Loader style={{opacity: loading ? 1 : 0}} />
          <form onSubmit={onSubmit} className='form'>
            <div data-cy='signupView' style={mystyle}>

            <TitleText text="Signup" />
            <NormalText text="Please fill out all fields." />
                <FormInput type='text' validation={basic} value={data.firstName} onChange={onChange} require={true} errorText="Please enter more Characters" label='First Name' id='firstName' name='firstName'/>
                <FormInput type='text' validation={basic} value={data.lastName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Last Name' id='lastName' name='lastName' />
                <FormInput type='text' value={data.position} onChange={onChange} label='Position' id='position' name='position' />
                <FormInput type='email' validation={email} value={data.email} onChange={onChange} require={true} errorText="Invalid Email" label='Email'  id='email' name='email' />
                <FormInput type='password' validation={password} value={data.password} onChange={onChange} require={true} errorText="Password Invalid" label='Password' id='password' name='password' />
                <FormInput type='password' validation={passwordFinal} value={data.passwordConfirmation} onChange={passwordConfirmChange} require={true} errorText="Passwords Do Not Match" label='Confirm Password' id='passwordConfirmation' name='passwordConfirmation' />
                <InfoDialog />  
                <ButtonInput onClick={SignupPressed} disabled={!isValid()} type='submit' primary={true} text="Submit" />   
            </div>
          </form>
          </CardContainer>
          <Background/>
        </>
      )

}


export default Signup
