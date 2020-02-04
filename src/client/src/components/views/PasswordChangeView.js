import React, { useReducer, useState } from "react"
import { Button } from '@material-ui/core'
import API from "../../axios.config"
import MailIcon from '@material-ui/icons/Mail'
import CardContainer from '../CardContainer'
import Background from '../Background'
import Nav from '../Nav'
import TitleText from '../TitleText'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import SuccessMessage from '../SuccessMessage'
import Loader from '../Loader'


const PasswordChangeView = () => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        currentPassword: '',
        newPassword: ''
    })

    // For Loading Animation
    const [loading, setLoading] = useState(false)

    // For Error Message
    const [errorMessage, setErrorMessage] = useState(null)

    // For Success Message
    const [successMessage, setSuccessMessage] = useState(null)

    const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.put(
        '/api/users/password', data)
        .then(function (response) {

            console.log(response)
            setLoading(false)
            setSuccessMessage("Your password has been changed.")
        })
        .catch(function (error) {
            console.log(error.response.data)
            setLoading(false)
            setErrorMessage(error.response.data)
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

    function SendPasswordPressed() {
        console.log("Send Email Pressed")
        setLoading(true)
    }

    // Client Validation
    const onChange = e => setData({[e.target.name]: e.target.value})
    const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1024}$/)

    return (
        <>
        {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}
        {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />}

        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false}/>
        <CardContainer background={Background}>
        <form onSubmit={onSubmit} className='form'>
            <div data-cy="passwordView" style={mystyle}>
                <TitleText text="Password Change" />
                <FormInput type='password' validation={password} value={data.currentPassword} onChange={onChange} require={true} errorText="Invalid Password" label='Current Password'  id='currentPassword' name='currentPassword' />
                <FormInput type='password' validation={password} value={data.newPassword} onChange={onChange} require={true} errorText="Invalid Password" label='New Password'  id='newPassword' name='newPassword' />

                <Button onClick={SendPasswordPressed} variant="outlined" type='submit' style={buttonMain} color="primary">Save Password <MailIcon style={smallIcon} /></Button>
            </div>
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default PasswordChangeView