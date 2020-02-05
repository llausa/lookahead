import React, { Fragment, useState } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AccountDetailsView from './views/AccountDetailsView'
import HomeView from './views/HomeView'
import EditTaskView from './views/EditTaskView'
import LoginView from './views/LoginView'
import SignUpView from './views/SignUpView'
import ProjectView from './views/ProjectView'
import ProjectsView from './views/ProjectsView'
import ProjectUsersView from './views/ProjectUsersView'
import ProjectAddUsersView from './views/ProjectAddUsersView'
import ProjectUserSettingsView from './views/ProjectUserSettingsView'
import ProjectSettingsView from './views/ProjectSettingsView'
import NewTaskView from './views/NewTaskView'
import NewProjectView from './views/NewProjectView'
import EditProjectView from './views/EditProjectView'
import EmailChangeView from './views/EmailChangeView'
import PasswordChangeView from './views/PasswordChangeView'
import PrivateRoute from '../components/PrivateRoute'


const App = () => {

  const [projectId, setProjectId] = useState(1)
  const [ownerId, setOwnerId] = useState(1)
  const [userId, setUserId] = useState(2)
  const [restrictedUserId, setRestrictedUserId] = useState(3)
  const [taskId, setTaskId] = useState(3)

  const [redirect, setRedirect] = useState(null)

  const redirectFunc = (val) => {
    setRedirect(val)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Redirector redirect={redirect} setRedirect={setRedirect} />
        <Switch>
          <PrivateRoute reverse exact path="/" component={HomeView} redirect={redirectFunc} data-cy="homeView"><HomeView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute reverse exact path="/login" component={LoginView} redirect={redirectFunc} data-cy="loginView"><LoginView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute reverse exact path="/signup" component={SignUpView} redirect={redirectFunc} data-cy="signupView" ><SignUpView redirect={redirectFunc} /></PrivateRoute>

          <PrivateRoute exact path="/projects" component={ProjectsView} redirect={redirectFunc} data-cy="projectsView"><ProjectsView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/account/email" component={EmailChangeView} redirect={redirectFunc} data-cy="emailView"><EmailChangeView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/account/password" component={PasswordChangeView} redirect={redirectFunc} data-cy="passwordView"><PasswordChangeView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/account/details" component={AccountDetailsView} redirect={redirectFunc} data-cy="detailsView"><AccountDetailsView redirect={redirectFunc} /></PrivateRoute>

          <PrivateRoute exact path="/projects/new" component={NewProjectView} redirect={redirectFunc} data-cy="newProjectView"><NewProjectView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId" component={ProjectView} redirect={redirectFunc} data-cy="projectView" projectId={projectId}> <ProjectView redirect={redirectFunc} /></PrivateRoute>

          <PrivateRoute exact path="/projects/:projectId/users" component={ProjectUsersView} redirect={redirectFunc} data-cy="projectUsersView" render={ props => <ProjectUsersView {...props} projectId={projectId}/>}><ProjectUsersView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId/users/add" component={ProjectAddUsersView} redirect={redirectFunc} data-cy="projectAddUsersView" render={ props => <ProjectAddUsersView {...props} projectId={projectId}/>}><ProjectAddUsersView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId/users/:userid" component={ProjectUserSettingsView} redirect={redirectFunc} data-cy="projectUserSettingsView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} userId={userId}/>}><ProjectUserSettingsView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId/edit" component={ProjectSettingsView} redirect={redirectFunc} data-cy="editProjectView" render={ props => <EditProjectView {...props} projectId={projectId}/>}><EditProjectView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId/newtask" component={NewTaskView} redirect={redirectFunc} data-cy="newTaskView" render={ props => <ProjectView {...props} projectId={projectId}/>}><NewTaskView redirect={redirectFunc} /></PrivateRoute>
          <PrivateRoute exact path="/projects/:projectId/edittask/:taskid" component={EditTaskView} redirect={redirectFunc} data-cy="editTaskView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} taskId={taskId}/>}><EditTaskView redirect={redirectFunc} /></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

function Redirector(props) {

  if(props.redirect) {
    let redirect = props.redirect
    props.setRedirect(null)
    return <Redirect to={redirect} />
  }

  return (
    <>
    </>
  )
}

export default App
