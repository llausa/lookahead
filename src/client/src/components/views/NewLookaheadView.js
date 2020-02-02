import React from "react"
import axios from 'axios'
import CardContainer from '../CardContainer'
import Nav from '../Nav'
import DateInput from '../DateInput'
import TextInput from '../TextInput'
import FormInput from '../FormInput'
import ButtonInput from '../ButtonInput'
import Background from '../../images/WhiteBackgroundSmall.jpg'
import TitleText from '../TitleText'
import NormalText from '../NormalText'
import TimeZonePicker from '../TimeZonePicker'


const NewLookaheadView = () => {

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

    


    return (
        <>
      <Nav backButtonLink = "/projects" BackButton={true} MenuButton={false} />
      <CardContainer background={Background}>
      <form className='form'>
        <div data-cy="newProjectView" style={mystyle}>
            <TitleText text="New Project" />
            <NormalText text="Please fill out all required fields" />
            <TextInput label="Title" required={true} />
            <TextInput label="Description" multiline={true} />

            <TimeZonePicker label="Timezone" />
            <DateInput label="Start Date"/>
            <DateInput label="End Date"/>

            <ButtonInput disabled={false} type='submit' primary={true} color='primary' text="Create" />

        </div>
        </form>
        </CardContainer>
        </>
    )
}

export default NewLookaheadView;