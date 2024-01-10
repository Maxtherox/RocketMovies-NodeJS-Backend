// Importa a classe Router do módulo Express.
const { Router } = require("express");

// Importa o controller responsável pelas operações relacionadas aos usuários.
const UsersController = require("../controllers/UsersController");

// Cria uma instância do Router do Express para gerenciar as rotas relacionadas aos usuários.
const usersRoutes = Router();

// Instancia o controller de usuários para lidar com as operações relacionadas aos usuários.
const usersController = new UsersController();

// Define a rota e a função a ser executada quando uma requisição POST é feita para a rota raiz ("/").
usersRoutes.post("/", usersController.create);

// Define a rota e a função a ser executada quando uma requisição PUT é feita para uma rota que inclui um parâmetro ":id".
usersRoutes.put("/:id", usersController.update);

// Exporta as rotas configuradas para serem utilizadas em outros lugares do aplicativo.
module.exports = usersRoutes;
