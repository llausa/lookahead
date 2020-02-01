import React, { useReducer } from 'react'
import axios from 'axios'
import ButtonInput from '../ButtonInput'
import FormInput from '../FormInput'
import InfoDialog from '../InfoDialog'
import CardContainer from '../CardContainer'
import Background from '../../images/WhiteBackgroundSmall.jpg'
import Nav from '../Nav'
import TitleText from '../TitleText'
import NormalText from '../NormalText'


const Signup = () => {
    
    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: '',
        passwordConfirmation: '',
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
            display: 'flex',
            flexDirection: 'column',
            alignitems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#2baafe',
            padding: '10px',
            maxWidth: '400px',
            margin: 'auto',
        }


        // Client Validation
        const basic = (text) => text.length > 2
        const email = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
        const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1000}$/)
        const passwordFinal = (text) => text === data.password

        // Checks all forms that are required are filled with no erros
        // Then allows Submit button to work
        let ButtonText = "Submit" 
        let ButtonDisabled = false

      return (
  
        <>
        <Nav backButtonLink = "/" BackButton={true} MenuButton={true}/>
        <CardContainer background={Background}>
          <form onSubmit={onSubmit} className='form'>
            <div data-cy='signupView' style={mystyle}>

            <TitleText text="Signup" />
            <NormalText text="Please fill out all fields." />
                <FormInput type='text' validation={basic} value={data.firstName} onChange={onChange} require={true} errorText="Please enter more Characters" label='First Name' id='firstName' name='firstName'/>
                <FormInput type='text' validation={basic} value={data.lastName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Last Name' id='lastName' name='lastName' />
                <FormInput type='text' value={data.position} onChange={onChange} label='Position' id='position' name='position' />
                <FormInput type='email' validation={email} value={data.email} onChange={onChange} require={true} errorText="Invalid Email" label='Email'  id='email' name='email' />
                <FormInput type='password' validation={password} value={data.password} onChange={onChange} require={true} errorText="Password Invalid" label='Password' id='password' name='password' />
                <FormInput type='password' validation={passwordFinal} value={data.passwordConfirmation} onChange={onChange} require={true} errorText="Passwords Do Not Match" label='Confirm Password' id='passwordConfirmation' name='passwordConfirmation' />
                <InfoDialog />  
                <ButtonInput disabled={ButtonDisabled} type='submit' primary={true} color='primary' text={ButtonText} />   
            </div>
          </form>
          </CardContainer>
        </>
      )

}

export default Signup
