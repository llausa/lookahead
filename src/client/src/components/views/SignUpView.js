import React, { useReducer } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import FormInput from '../FormInput'
import InfoDialog from '../InfoDialog'


const Signup = () => {
    
    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: '',
        passwordConfirmation: ''
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
    
        const buttonMain = {
            color: '#2baafe',
            margin: '20px',
            border: '1px solid rgb(43, 170, 254)'
        }

        const text = (text) => text.length > 2
        const email = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
        const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1000}$/)

      return (
  
          <form onSubmit={onSubmit} className='form'>
            <div data-cy='signupView' style={mystyle}>
                <h1 style={{margin: '40px 0 10px 0', fontSize: '70px'}}>Signup</h1>
                    
                <p style={{margin: '0 0 20px 0', fontSize:'12px'}}>Please fill out all fields.</p>
                <FormInput type='text' validation={text} value={data.firstName} onChange={onChange} require={true} errorText="Please enter more Characters" label='First Name' id='firstName' name='firstName' />
                <FormInput type='text' validation={text} value={data.lastName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Last Name' id='lastName' name='lastName' />
                <FormInput type='text' value={data.position} onChange={onChange} label='Position' id='position' name='position' />
                <FormInput type='email' validation={email} value={data.email} onChange={onChange} require={true} errorText="Invalid Email" label='Email'  id='email' name='email' />
                <FormInput type='password' validation={password} value={data.password} onChange={onChange} require={true} errorText="Password Invalid" label='Password' id='password' name='password' />
                <FormInput type='password' validation={password} value={data.passwordConfirmation} onChange={onChange} require={true} errorText="Password Invalid" label='Confirm Password' id='passwordConfirmation' name='passwordConfirmation' />
                <InfoDialog />  
                
                <Button type='submit' style={buttonMain} color='primary' >Submit</Button>   
            </div>
          </form>
      )

}

export default Signup
