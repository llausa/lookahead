import React , { useReducer, useState }from "react"
import API from "../../axios.config"
import { Button } from '@material-ui/core'
import CardContainer from '../CardContainer'
import Background from '../Background'
import Nav from '../Nav'
import TitleText from '../TitleText'
import FormInput from '../FormInput'
import NormalText from '../NormalText'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import SuccessMessage from '../SuccessMessage'
import MailIcon from '@material-ui/icons/Mail'

const EmailChangeView = () => {

    // For Loading Animation
    const [loading, setLoading] = useState(false)

    // For Error Message
    const [errorMessage, setErrorMessage] = useState(null)

    // For Success Message
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        email: '',
        password: ''
    })

    const onSubmit = e => {
        e.preventDefault()

        console.log(data)

        API.put(
        '/api/users/email', data)
        .then(function (response) {

            console.log(response)
            setLoading(false)
            setSuccessMessage("Your email has been changed.")
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
        setLoading(true)
    }



    // Client validation
    const onChange = e => setData({[e.target.name]: e.target.value})
    const email = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
    const password = (text) => text.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1000}$/)

    const isValid = () => {
        return !!email(data.email) && !!password(data.password)
    }

    return (
        <>
        {errorMessage && <ErrorMessage msg={errorMessage.message} onClose={() => setErrorMessage(null)} />}
        {successMessage && <SuccessMessage msg={successMessage} onClose={() => setSuccessMessage(null)} />}

        <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false}/>
        <Loader style={{opacity: loading ? 1 : 0}} />
        <CardContainer background={Background}>
        <form onSubmit={onSubmit} className='form'>
            <div data-cy="emailView" style={mystyle}>

                <TitleText text="Update Email" />
                <NormalText text="Please enter your new email and password." />
                <FormInput type='email' validation={email} value={data.email} onChange={onChange} require={true} errorText="Invalid Email" label='Email'  id='email' name='email' />
                <FormInput type='password' value={data.password} onChange={onChange} require={true} errorText="Password Invalid" label='Password' id='password' name='password' />

                <Button onClick={SendEmailPressed} type='submit' variant="outlined" style={buttonMain} color="primary">Save Email <MailIcon style={smallIcon} disabled={!isValid()} /></Button>

            </div>
        </form>
        </CardContainer>
        <Background/>
        </>
    )
}

export default EmailChangeView;