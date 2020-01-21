context('Authenticated and Authorised Routing', () => {
  // beforeEach(() => {

  //   cy.get("[data-cy=navbar").then(navbar => {
  //     if (navbar.get("[data-cy=menuIcon")) {
  //       cy.get("[data-cy=menuIcon").click()
  //       cy.get("[data-cy=logoutButton").click()
  //     }
  //   })
  //   cy.visit("/")
  //   cy.get("[data-cy=loginButton]").click()
  //   cy.get("[data-cy=emailField]").type(fixtures.registeredOwner.email)
  //   cy.get("[data-cy=passwordField]").type(fixtures.registeredOwner.password)
  //   cy.get("[data-cy=submitButton").click()
  //   cy.url().should("include", "/projects")
  // })

  describe("Home Page", () => {

    beforeEach(() => {
      cy.visit('/')
    })

    it("should redirect to Project Page Component", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

  describe("Login Page", () => {

    beforeEach(() => {
      cy.visit('/login')
    })

    it("should redirect to Project Page Component", () => {
      cy.get("[data-cy=projectsView]")
      // cy.location('pathname').should('eq', '/projects')
    })
  })

  describe("Signup Page", () => {

    beforeEach(() => {
      cy.visit('/signup')
    })

    it("should redirect to Project Page Component", () => {
      cy.get("[data-cy=projectsView]")
      // cy.location('pathname').should('eq', '/projects')
    })
  })

  describe("Email Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/email')
    })

    it("should load Email Change Page Component", () => {
      cy.get("[data-cy=emailView]")
    })
  })
  
  describe("Password Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/password')
    })

    it("should render Password Change Page Component", () => {
      cy.get("[data-cy=passwordView]")
    })
  })

  describe("Account Details Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/details')
    })

    it("should render Account Update Component", () => {
      cy.get("[data-cy=detailsView]")
    })
  })

  describe("Projects Page", () => {

    beforeEach(() => {
      cy.visit('/projects')
    })

    it("should render Projects Page Component", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

  describe("Project Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}`)
    })

    it("should render Project Page", () => {
      cy.get("[data-cy=projectView]")
    })
  })

  describe("Project Users Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users`)
    })

    it("should render Project Users Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Project User Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users/${fixtures.validProject.users[0].id}`)
    })

    it("should render Project User Settings Page Component", () => {
      cy.get("[data-cy=projectUserSettingsView]")
    })
  })

  describe("Project Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edit`)
    })

    it("should render Project Settings Component", () => {
      cy.get("[data-cy=projectSettingsView]")
    })
  })


  describe("Project New Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/newTask`)
    })

    it("should render Project New Task Page Component", () => {
      cy.get("[data-cy=newTaskView]")
    })

  })

  describe("Project Edit Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edittask/${fixtures.validProject.tasks[0].id}`)
    })

    it("should render Edit Task Page Component", () => {
      cy.get("[data-cy=editTaskView]")
    })
  })


  describe("New Project Page", () => {

    beforeEach(() => {
      cy.visit('/projects/new')
    })

    it("should render New Project Page Component", () => {
      cy.get("[data-cy=newProjectView]")
    })
  })




})

context('Non-Authorised Routing', () => {
  // beforeEach(() => {

    //   cy.get("[data-cy=navbar").then(navbar => {
    //     if (navbar.get("[data-cy=menuIcon")) {
    //       cy.get("[data-cy=menuIcon").click()
    //       cy.get("[data-cy=logoutButton").click()
    //     }
    //   })
    //   cy.visit("/")
    //   cy.get("[data-cy=loginButton]").click()
    //   cy.get("[data-cy=emailField]").type(fixtures.restrictedUser.email)
    //   cy.get("[data-cy=passwordField]").type(fixtures.restrictedUser.password)
    //   cy.get("[data-cy=submitButton").click()
    //   cy.url().should("include", "/projects")
    // })


  describe("Project Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

  describe("Project Users Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

  describe("Project User Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users/${fixtures.validProject.users[0].id}`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

  describe("Project Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edit`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })
  })


  describe("Project New Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/newTask`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })

  })

  describe("Project Edit Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edittask/${fixtures.validProject.tasks[0].id}`)
    })

    it("should redirect to Projects Page", () => {
      cy.get("[data-cy=projectsView]")
    })
  })

})

context('Non-Authenticated Routing', () => {
  // beforeEach(() => {
  //   if (cy.get("[data-cy=navbar]")) {
  //   cy.get("[data-cy=navbar").then(navbar => {
  //     if (navbar.get("[data-cy=menuIcon")) {
  //       cy.get("[data-cy=menuIcon").click()
  //       cy.get("[data-cy=logoutButton").click()
  //     }
  //   })
  // }
  // })


  describe("Home Page", () => {

    beforeEach(() => {
      cy.visit('/')
    })

    it("should load Home Page Component", () => {
      cy.get("[data-cy=homeView]")
    })
  })

  describe("Login Page", () => {

    beforeEach(() => {
      cy.visit('/login')
    })


    it("should load Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
    it("should render Login Form", () => {
      cy.get("[data-cy=loginForm]")
    })
  })

  describe("Signup Page", () => {

    beforeEach(() => {
      cy.visit('/signup')
    })

    it("should load Signup Page Component", () => {
      cy.get("[data-cy=signupView]")
    })
  })

  describe("Email Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/email')
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })
  
  describe("Password Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/password')
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Account Details Change Page", () => {

    beforeEach(() => {
      cy.visit('/account/details')
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Projects Page", () => {

    beforeEach(() => {
      cy.visit('/projects')
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Project Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Project Users Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Project User Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/users/${fixtures.validProject.users[0].id}`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })

  describe("Project Settings Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edit`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })


  describe("Project New Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/newTask`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })

  })

  describe("Project Edit Task Page", () => {

    beforeEach(() => {
      cy.visit(`/project/${fixtures.validProject.id}/edittask/${fixtures.validProject.tasks[0].id}`)
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })



  describe("New Project Page", () => {

    beforeEach(() => {
      cy.visit('/projects/new')
    })

    it("should redirect to Login Page Component", () => {
      cy.get("[data-cy=loginView]")
    })
  })


})