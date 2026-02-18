describe('Central de Atendimento ao cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdefgh', 30)

    cy.get('#firstName').type('Rodney')
    cy.get('#lastName').type('Gois')
    cy.get('#email').type('rodney@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Rodney')
    cy.get('#lastName').type('Gois')
    cy.get('#email').type('rodney#gmail.com')
    cy.get('#open-text-area').type('texto texto cypress')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {

    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Rodney')
    cy.get('#lastName').type('Gois')
    cy.get('#email').type('rodney@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('texto texto cypress')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Rodney')
      .should('have.value', 'Rodney')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Gois')
      .should('have.value', 'Gois')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('rodney@gmail.com')
      .should('have.value', 'rodney@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado - Recebendo um Objeto ', () => {
    cy.clock()

    const data = {
      firstName: 'Fernando',
      lastName: 'Lucas',
      email: 'neybsb@gmail.com',
      text: 'teste teste cypress 2026'
    }
    cy.fillMandatoryFieldsAndSubmit2(data)

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado - Objeto com valores padrão', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit3()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    // cy.get('input[type="radio"] [value="feedback"]')
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfSerbice => {
        cy.wrap(typeOfSerbice)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')  // 1. Pega os dois checkboxes da tela
      .check()                        // 2. Marca TODOS de uma vez
      .should('be.checked')           // 3. Valida que TODOS estão marcados
      .last()                         // 4. Filtra a seleção e foca APENAS no último
      .uncheck()                      // 5. Desmarca esse último que está focado
      .should('not.be.checked')       // 6. Valida que ele realmente desmarcou

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/DOCUMENTO TESTE.pdf')
      .should(input => {
        expect(input[0].files[0].name).to.equal('DOCUMENTO TESTE.pdf')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/DOCUMENTO TESTE.pdf', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('DOCUMENTO TESTE.pdf')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('DOCUMENTO TESTE.pdf').as('arquivoPdf')
    
    cy.get('input[type="file"]')
    .selectFile('@arquivoPdf')
    .should(input => {
      expect(input[0].files[0].name).to.equal('DOCUMENTO TESTE.pdf')
    })

  })
}) 
