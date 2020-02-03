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
import NewLookaheadView from './views/NewLookaheadView'
import EmailChangeView from './views/EmailChangeView'
import PasswordChangeView from './views/PasswordChangeView'


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
        {redirect && <Redirect to={redirect} />}
        <Switch>
          <Route exact path="/" component={HomeView} data-cy="homeView"><HomeView redirect={redirectFunc} /></Route>
          <Route exact path="/login" component={LoginView} data-cy="loginView"><LoginView redirect={redirectFunc} /></Route>
          <Route exact path="/signup" component={SignUpView} data-cy="signupView" ><SignUpView redirect={redirectFunc} /></Route>
          <Route exact path="/projects" component={ProjectsView} data-cy="projectsView"><ProjectsView redirect={redirectFunc} /></Route>
          <Route exact path="/account/email" component={EmailChangeView} data-cy="emailView"><EmailChangeView redirect={redirectFunc} /></Route>
          <Route exact path="/account/password" component={PasswordChangeView} data-cy="passwordView"><PasswordChangeView redirect={redirectFunc} /></Route>
          <Route exact path="/account/details" component={AccountDetailsView} data-cy="detailsView"><AccountDetailsView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:projectId" component={ProjectView} data-cy="projectView" 
          
          render={ props => <ProjectView {...props} projectId={projectId}/>}>
            <ProjectView redirect={redirectFunc} />
          
          </Route>
          <Route exact path="/projects/new" component={NewLookaheadView} data-cy="newProjectView"><NewLookaheadView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/users" component={ProjectUsersView} data-cy="projectUsersView" render={ props => <ProjectUsersView {...props} projectId={projectId}/>}><ProjectUsersView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/users/add" component={ProjectAddUsersView} data-cy="projectAddUsersView" render={ props => <ProjectAddUsersView {...props} projectId={projectId}/>}><ProjectAddUsersView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/users/:userid" component={ProjectUserSettingsView} data-cy="projectUserSettingsView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} userId={userId}/>}><ProjectUserSettingsView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/edit" component={ProjectSettingsView} data-cy="projectSettingsView" render={ props => <ProjectView {...props} projectId={projectId}/>}><ProjectSettingsView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/newtask" component={NewTaskView} data-cy="newTaskView" render={ props => <ProjectView {...props} projectId={projectId}/>}><NewTaskView redirect={redirectFunc} /></Route>
          <Route exact path="/project/:id/edittask/:taskid" component={EditTaskView} data-cy="editTaskView" render={ props => <ProjectUserSettingsView {...props} projectId={projectId} taskId={taskId}/>}><EditTaskView redirect={redirectFunc} /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
