# 🧪 Automação E2E - Central de Atendimento ao Cliente TAT

[![Cypress](https://img.shields.io/badge/Cypress-12+-0077b5?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 💻 Sobre o Projeto

Este projeto contém a suíte de testes automatizados Ponta a Ponta (End-to-End) para a aplicação web **CAC TAT** (Central de Atendimento ao Cliente).

O repositório foi desenvolvido como parte prática do curso ["Cypress, do Zero à Nuvem"](https://talkingabouttesting.com/) da Escola Talking About Testing, ministrado por Walmyr Filho. O foco principal não é apenas cobrir a aplicação com testes, mas aplicar boas práticas de engenharia de software, como **Clean Code**, estabilidade de seletores e manutenibilidade

## 🎯 Cobertura de Testes e Aprendizados Aplicados

Durante o desenvolvimento desta suíte, as seguintes estratégias e funcionalidades foram implementadas:

- **Estratégia de Seletores:** Uso avançado de `cy.contains()` para navegação no DOM focada na ótica do usuário e criação de testes resilientes (evitando *flaky tests* causados por classes dinâmicas)

- **Validações de Estado (Asserções):** Compreensão profunda entre validar textos de exibição (`have.text`) vs. valores de formulário (`have.value`), além de garantir a visibilidade e estado de elementos (`be.visible`, `be.checked`)

- **Manipulação de Múltiplos Elementos:** Interação com listas de opções suspensas (Dropdowns) usando `.select()` e iteração inteligente em Radio Buttons e Checkboxes utilizando `.each()` e `cy.wrap()`

- **Upload de Arquivos:** Simulação de anexos de arquivos padrão e interações avançadas de *drag-and-drop* utilizando o comando `.selectFile()` e acessando a API nativa do navegador para validação

- **Custom Commands:** Abstração de lógicas repetitivas (como preenchimento de formulários) em comandos customizados dinâmicos no `commands.js`, substituindo o padrão *Page Objects* por uma abordagem mais moderna e direta

- **Testes Negativos:** Validação do comportamento da aplicação diante de entradas inválidas, garantindo a eficácia de máscaras de input e obrigatoriedade de campos


## 🚀 Como Executar Localmente
Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

Passos para rodar

1. Clone este repositório:
```bash
git clone [https://github.com/rodneygoisbsb/cypress-do-zero-a-nuvem.git](https://github.com/rodneygoisbsb/cypress-do-zero-a-nuvem.git)
```

2. Acesse a pasta do projeto:
```bash
cd SEU-REPOSITORIO
```

3. Instale as dependências:
```bash
npm install
```

## Executando os Testes

Para abrir a interface gráfica do Cypress (Test Runner) e acompanhar a execução visualmente:

```Bash
npx cypress open
```

Para rodar os testes em modo headless (direto no terminal, ideal para esteiras de CI/CD):

```Bash
npx cypress run
```
Desenvolvido por **Rodney Gois**