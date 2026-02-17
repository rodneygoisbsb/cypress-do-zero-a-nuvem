Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Rodney')
    cy.get('#lastName').type('Gois')
    cy.get('#email').type('rodney@gmail.com')
    cy.get('#open-text-area').type('Texto descrição cypress')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data3 = {
      firstName: 'Ana',
      lastName: 'Silva',
      email: 'aninha@gmail.com',
      text: 'teste teste cypress cypress'
    }) => {
    cy.get('#firstName').type(data3.firstName)
    cy.get('#lastName').type(data3.lastName)
    cy.get('#email').type(data3.email)
    cy.get('#open-text-area').type(data3.text)
    cy.contains('button', 'Enviar').click()
  })