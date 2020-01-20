import React, { Fragment, useState } from 'react'

import Nav from './Nav'

import { BrowserRouter, Route } from 'react-router-dom'
import AccountDetailsView from './views/AccountDetailsView'
import HomeView from './views/HomeView'
import EditTaskView from './views/EditTaskView'
import LoginView from './views/LoginView'
import SignUpView from './views/SignUpView'
import ProjectView from './views/ProjectView'
import ProjectsView from './views/ProjectsView'
import ProjectUsersView from './views/ProjectUsersView'
import ProjectUserSettingsView from './views/ProjectUserSettingsView'
import ProjectSettingsView from './views/ProjectSettingsView'
import NewTaskView from './views/NewTaskView'
import NewLookaheadView from './views/NewLookaheadView'
import EmailChangeView from './views/EmailChangeView'
import PasswordChangeView from './views/PasswordChangeView'


function App() {

  const [projectId, setProjectId] = useState(1)
  const [userId, setUserId] = useState(2)
  const [taskId, setTaskId] = useState(3)


  return (
    <div className="App">
    <Nav></Nav>
      <BrowserRouter>
        <>
          <Route exact path="/" component={HomeView}/>
          <Route exact path="/login" component={LoginView}/>
          <Route exact path="/signup" component={SignUpView}/>
          <Route exact path="/projects" component={ProjectsView}/>
          <Route exact path="/account/email" component={EmailChangeView}/>
          <Route exact path="/account/password" component={PasswordChangeView}/>
          <Route exact path="/account/details" component={AccountDetailsView}/>
          <Route exact path="/project/:id" component={ProjectView} render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/projects/new" component={NewLookaheadView}/>
          <Route exact path="/project/:id/users" component={ProjectUsersView} render={ props => <ProjectUsersView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/users/:userid" component={ProjectUserSettingsView} render={ props => <ProjectUserSettingsView {...props} projectId={projectId} userId={userId}/>}/>
          <Route exact path="/project/:id/edit" component={ProjectSettingsView} render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/newtask" component={NewTaskView} render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/edittask/:taskid" component={EditTaskView} render={ props => <ProjectUserSettingsView {...props} projectId={projectId} taskId={taskId}/>}/>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;