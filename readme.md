# MoviesTR-API-Backend
Backend da aplicação de autoria própria chamada MoviesTR, backend criado após desafio durante o curso Fullstack do site www.rocketseat.com.br

# movierstr - API de Notas para filmes

**Descrição:**
Esta é uma API de notas desenvolvida como parte do desafio do curso Full Stack da Rocketseat. Atualmente, encontra-se em fase de criação, destinada a fornecer funcionalidades de gerenciamento de notas com suporte a tags.

**Funcionalidades:**
- **Consulta de Notas:** Busca de notas com base em parâmetros como título, ID do usuário e tags associadas.
- **Filtragem por Tags:** Possibilidade de filtrar notas por tags associadas.
- **Ordenação e Pesquisa:** Suporte a ordenação e pesquisa por título.

**Como Usar:**
1. **Instalação:**
    npm install

# Configuração do Banco de Dados:
    npm run migrate

# Execução da API:
**Modo de Produção:**
    npm start

**Modo de Desenvolvimento (com Nodemon):**
    npm run dev

# Consulta de Notas:

- Endpoint: /movies
- Parâmetros:
    - title (opcional): Título da nota.
    - user_id (obrigatório): ID do usuário.
    - tags (opcional): Tags associadas à nota (separadas por vírgula).
    - rating (opicional): Avaliação associada a nota

# Dependências:

- bcryptjs (^2.4.3): Biblioteca para hash de senhas.
- express (^4.18.2): Framework web para Node.js.
- express-async-errors (^3.1.1): Tratamento de erros assíncronos em express.
- knex (^3.1.0): Construtor de consultas SQL para Node.js.
- sqlite (^5.1.1): Conector SQLite para Node.js.
- sqlite3 (^5.1.7): Módulo SQLite para Node.js.

***Observação: Este projeto é foi feito durante um desafio em um curso e o desenvolvimento do mesmo está em andamento portanto sujeito a alterações durante o desenvolvimento. Contribuições e sugestões são bem-vindas!***
