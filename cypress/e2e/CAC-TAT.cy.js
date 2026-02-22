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

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html') // have.attr = deve ter | href = atributo | privacy.html = valor
      .and('have.attr', 'target', '_blank') // have.attr = deve ter | target = atributo | _blank = valor
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => { // Invoca o texto de uma vez só
    cy.get('#open-text-area')
      .invoke('val', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.')
      .should('have.value', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('Encontre o gato escondido e mostre-o', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
  })
  it.only('Mudar palavras através do .invoke()', () => {
    cy.get('#title')
      .invoke('text', 'NOVO TÍTULO ALEATÓRIO')
  })
}) 
