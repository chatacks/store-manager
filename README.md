# Store Manager

Esta é uma API RESTful desenvolvida para um sistema de gerenciamento de vendas. Com esta API, é possível criar, visualizar, atualizar e deletar produtos e vendas. A arquitetura utilizada segue o padrão **MSC (Model, Service, Controller)**, proporcionando uma estrutura clara e organizada. A API utiliza o banco de dados MySQL para gestão dos dados.

## Visão Geral

A **Store Manager API** oferece endpoints que permitem a gestão de produtos e vendas de forma eficiente e segura. A arquitetura em camadas MSC garante a separação de responsabilidades, facilitando a manutenção e a escalabilidade do sistema.

## Funcionalidades

- **CRUD de Produtos**: Operações para criar, ler, atualizar e deletar produtos no sistema.
- **CRUD de Vendas**: Operações para criar, ler, atualizar e deletar registros de vendas.
- **Arquitetura MSC**: Implementação das camadas de Model, Service e Controller, organizando o fluxo de dados e as regras de negócio.
- **Testes Automatizados**: Testes desenvolvidos com Mocha, Chai e Sinon para garantir o funcionamento correto das funcionalidades.

## Tecnologias Utilizadas

- **Linguagem**: JavaScript (Node.js)
- **Framework Web**: Express
- **Banco de Dados**: MySQL
- **Validação**: Joi
- **Manejo de Erros**: @hapi/boom
- **Testes**: Mocha, Chai, Sinon
- **Cobertura de Código**: NYC
- **Mutação de Código**: Stryker
- **Ferramentas de Desenvolvimento**: Nodemon, ESLint

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:chatacks/store-manager.git
   cd store-manager
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o banco de dados**:

   - Crie um banco de dados MySQL e configure as credenciais no arquivo `.env`.
   - Execute as migrações para criar as tabelas necessárias.

4. **Inicie a aplicação**:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## Scripts Disponíveis

- **`npm start`**: Inicia a aplicação.
- **`npm run dev`**: Inicia a aplicação em modo de desenvolvimento com Nodemon.
- **`npm run test:mocha`**: Executa os testes utilizando Mocha.
- **`npm run test:coverage`**: Executa os testes e gera o relatório de cobertura de código com NYC.
- **`npm run test:mutation`**: Executa os testes de mutação utilizando Stryker.
- **`npm run lint`**: Executa o ESLint para verificar a qualidade do código.

## Testes

Os testes foram configurados utilizando Mocha, Chai e Sinon para garantir a funcionalidade correta da API. Para executar os testes, utilize o comando:

```bash
npm run test:mocha
```

Para gerar o relatório de cobertura de código:

```bash
npm run test:coverage
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para relatar problemas ou sugerir melhorias. Pull requests também são apreciados.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Referências

- [Express](https://expressjs.com/) - Framework web minimalista para Node.js.
- [MySQL2](https://github.com/sidorares/node-mysql2) - Cliente MySQL para Node.js com suporte a Promises.
- [Mocha](https://mochajs.org/) - Framework de testes JavaScript.
- [Chai](https://www.chaijs.com/) - Biblioteca de asserções para Node.js e navegadores.
- [Sinon](https://sinonjs.org/) - Biblioteca para stubs, spies e mocks em testes.
- [Nodemon](https://nodemon.io/) - Ferramenta que reinicia automaticamente o servidor Node.js quando alterações são detectadas.
- [ESLint](https://eslint.org/) - Ferramenta de linting para JavaScript.