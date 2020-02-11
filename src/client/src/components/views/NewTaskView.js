import React, {useReducer, useState} from "react"
import API from "../../axios.config"
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import DateInput from '../DateInput'
import ButtonInput from '../ButtonInput'
import Background from '../Background'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import DurationPicker from '../DurationPicker'
import FormInput from '../FormInput'
import Loader from '../Loader'
import EditTaskOverlay from '../EditTaskOverlay'


const NewTaskView = () => {

  // For Loading Animation
  const [loading, setLoading] = useState(false)

    const [data, setData] = useReducer((state, newState) => (
        {...state, ...newState}
      ), {
        taskName: '',
        description: '',
        startDate: '',
        duration: ''
      })

      const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        API.post(
        '/api/users', data)
        .then(function (response) {
          setLoading(false)
        })
        .catch(function (error) {
          setLoading(false)
        })

      }

      const onChange = e => {
        setData({[e.target.name]: e.target.value})

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
        <>

      <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
      <CardContainer background={Background}>
      <Loader style={{opacity: loading ? 1 : 0}} />
      <form onSubmit={onSubmit} className='form'>
        <div data-cy="newProjectView" style={mystyle}>
            <TitleText text="New Task" />
            <NormalText text="Please fill out all required fields" />
            <FormInput type='text' validation={basic} value={data.taskName} onChange={onChange} require={true} errorText="Please enter more Characters" label='Task Name' id='taskName' name='taskName' />
            <FormInput type='text' validation={basic} value={data.description} onChange={onChange} require={false} multiline={true} label='Task Description' id='description' name='description' />

            <DateInput label="Start Date" day={1} id="startDate" name='startDate'/>

            <DurationPicker label="Duration (hours)*" id="duration" name='duration' style={{width: "100%"}}/>

            <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Create" />
        </div>
        </form>
        </CardContainer>
        <EditTaskOverlay edit />
        <Background/>
        </>
    )
}

export default NewTaskView