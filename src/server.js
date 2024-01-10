// Importa e configura o tratamento de erros assíncronos para o Express.
require("express-async-errors");

// Importa a classe de erro personalizada (AppError).
const AppError = require("./utils/AppError");

// Importa a função responsável por executar as migrações do banco de dados SQLite.
const migrationsRun = require("./database/sqlite/migrations");

// Importa o módulo Express.
const express = require("express");

// Importa as rotas definidas no arquivo "routes".
const routes = require("./routes");

// Executa as migrações do banco de dados SQLite.
migrationsRun();

// Cria uma instância do aplicativo Express.
const app = express();

// Habilita o middleware para interpretar o corpo das requisições como JSON.
app.use(express.json());

// Adiciona as rotas ao aplicativo Express.
app.use(routes);

// Middleware para tratar erros globais.
app.use((error, request, response, next) => {
    // Verifica se o erro é uma instância da classe AppError.
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    // Se não for um erro controlado, loga o erro no console.
    console.error(error);

    // Retorna uma resposta de erro interno do servidor (status 500).
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

// Define a porta na qual o servidor irá escutar as requisições.
const PORT = 3333;

// Inicia o servidor Express na porta especificada.
app.listen(PORT, () => console.log(`Server is running ${PORT}`));
