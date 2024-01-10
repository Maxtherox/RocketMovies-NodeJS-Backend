const  { Router } = require ("express");

const MoviesController = require("../controllers/MoviesController"); //importação do controller, (como MoviesControllers é uma classe, ele precisa ser instanciado na memória) (instancia = realocar espaço na memória para a classe)

const moviesRoutes = Router();


const moviesController = new MoviesController() //user controller sendo instanciado na memória <

moviesRoutes.get("/", moviesController.index);
moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);

module.exports = moviesRoutes;