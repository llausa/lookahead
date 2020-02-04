import React, {useReducer} from "react"
import API from "../../axios.config"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import DateInput from '../DateInput'
import TextInput from '../TextInput'
import ButtonInput from '../ButtonInput'
import Background from '../Background'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import TimeZonePicker from '../TimeZonePicker'
import FormInput from '../FormInput'

const ProjectSettingsView = () => {

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        projectTitle: '',
        location: '',
        startDate: '',
        endDate: ''
      })
    
      const onSubmit = e => {
        e.preventDefault()
    
        console.log(data)
    
        API.post(
        '/api/users', data)
        .then(function (response) {
            
            console.log(response)
        })
        .catch(function (error) {
            console.log(error.response.data)
        })
        
      }
    
      const onChange = e => {
        setData({[e.target.name]: e.target.value})
        console.log(data) 
        // setData({"location": location.value})
    }

    const mystyle = {
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        maxWidth: "400px",
        margin: "auto",
    }
    
    // Client Validation
    const basic = (text) => text.length > 2

    return (
        <div>
        <h1 data-cy="projectSettingsView">Project Settings View</h1>
        </div>
    )
}

export default ProjectSettingsView