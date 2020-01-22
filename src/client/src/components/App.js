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
  const [ownerId, setOwnerId] = useState(1)
  const [userId, setUserId] = useState(2)
  const [restrictedUserId, setRestrictedUserId] = useState(3)
  const [taskId, setTaskId] = useState(3)


  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <>
          <Route exact path="/" component={HomeView} data-cy="homeView"/>
          <Route exact path="/login" component={LoginView} data-cy="loginView"/>
          <Route exact path="/signup" component={SignUpView} data-cy="signupView"/>
          <Route exact path="/projects" component={ProjectsView} data-cy="projectsView"/>
          <Route exact path="/account/email" component={EmailChangeView} data-cy="emailView"/>
          <Route exact path="/account/password" component={PasswordChangeView} data-cy="passwordView"/>
          <Route exact path="/account/details" component={AccountDetailsView} data-cy="detailsView"/>
          <Route exact path="/project/:id" component={ProjectView} data-cy="projectView" render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/projects/new" component={NewLookaheadView} data-cy="newProjectView"/>
          <Route exact path="/project/:id/users" component={ProjectUsersView} data-cy="projectUsersView" render={ props => <ProjectUsersView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/users/:userid" component={ProjectUserSettingsView} data-cy="projectUserSettingsView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} userId={userId}/>}/>
          <Route exact path="/project/:id/edit" component={ProjectSettingsView} data-cy="projectSettingsView" render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/newtask" component={NewTaskView} data-cy="newTaskView" render={ props => <ProjectView {...props} projectId={projectId}/>}/>
          <Route exact path="/project/:id/edittask/:taskid" component={EditTaskView} data-cy="editTaskView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} taskId={taskId}/>}/>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
