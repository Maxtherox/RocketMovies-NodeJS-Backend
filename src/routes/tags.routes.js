const  { Router } = require ("express");

const TagsController = require("../controllers/TagsController"); //importação do controller, (como UserControllers é uma classe, ele precisa ser instanciado na memória) (instancia = realocar espaço na memória para a classe)

const tagsRoutes = Router();


const tagsController = new TagsController() //tag controller sendo instanciado na memória <

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;