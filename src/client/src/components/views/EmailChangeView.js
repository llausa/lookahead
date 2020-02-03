import React , { useReducer }from "react"
import axios from 'axios'
import { Button } from '@material-ui/core'
import CardContainer from '../CardContainer'
import Background from '../Background'
import Nav from '../Nav'
import TitleText from '../TitleText'
import FormInput from '../FormInput'
import NormalText from '../NormalText'

import MailIcon from '@material-ui/icons/Mail'

const EmailChangeView = () => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        emailNew: '',
        password: ''
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

    const mystyle = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#2baafe",
        padding: "10px",
        maxWidth: "400px",
        margin: "auto",
    }
    
    const buttonMain = {
        color: "#006EE2",
        margin: "20px",
        border: "1px solid #006EE2"
    }

    const smallIcon= {
        width: "auto",
        height: "16px",
        margin: "4px"
    }
    
    function SendEmailPressed() {
        console.log("Send Email Pressed")
    }

    // Client validation
    const onChange = e => setData({[e.target.name]: e.target.value})
    const email = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)

    return (
        <>
        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false}/>
        <CardContainer background={Background}>
        <form onSubmit={onSubmit} className='form'> 
        <div data-cy="emailView" style={mystyle}>
        
        <TitleText text="Update Email" />
        <NormalText text="Please enter your new email and password." />
        <FormInput type='email' validation={email} value={data.emailNew} onChange={onChange} require={true} errorText="Invalid Email" label='Email'  id='emailNew' name='emailNew' />
        <FormInput type='password' value={data.password} onChange={onChange} require={true} errorText="Password Invalid" label='Password' id='password' name='password' />
        
        <Button onClick={SendEmailPressed} variant="outlined" style={buttonMain} color="primary">Save Email <MailIcon style={smallIcon} /></Button>
        
        </div>
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default EmailChangeView;