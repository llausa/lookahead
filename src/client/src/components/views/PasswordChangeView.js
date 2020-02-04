import React, { useReducer } from "react"
import { Button } from '@material-ui/core'
import API from "../../axios.config"
import MailIcon from '@material-ui/icons/Mail'
import CardContainer from '../CardContainer'
import Background from '../Background'
import Nav from '../Nav'
import TitleText from '../TitleText'
import FormInput from '../FormInput'


const PasswordChangeView = () => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        currentPassword: '',
        newPassword: ''
    })

    const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.put(
        '/api/auth', data)
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
        color: "#006EE2",
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

    // Client Validation
    const onChange = e => setData({[e.target.name]: e.target.value})
    const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1024}$/)

    return (
        <>
        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false}/>
        <CardContainer background={Background}>
        <form onSubmit={onSubmit} className='form'>
            <div data-cy="passwordView" style={mystyle}>
                <TitleText text="Password Change" />
                <FormInput type='password' validation={email} value={data.currentPassword} onChange={onChange} require={true} errorText="Invalid Password" label='Current Password'  id='currentPassword' name='currentPassword' />
                <FormInput type='password' validation={email} value={data.newPassword} onChange={onChange} require={true} errorText="Invalid Password" label='New Email'  id='newEmail' name='newEmail' />

                <Button onClick={SendEmailPressed} variant="outlined" type='submit' style={buttonMain} color="primary">Send Email <MailIcon style={smallIcon} /></Button>
            </div>
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default PasswordChangeView