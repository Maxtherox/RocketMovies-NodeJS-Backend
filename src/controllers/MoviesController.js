// Importa o módulo de acesso ao banco de dados (Knex).
const knex = require("../database/knex");

// Declaração da classe MoviesController.
class MoviesController {
    // Método assíncrono para criar um novo filme.
    async create(request, response){
        // Extrai dados do corpo da requisição e parâmetros da URL.
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        // Insere uma nova nota (filme) no banco de dados e obtém o ID gerado.
        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        // Mapeia as tags para o formato esperado pelo banco de dados.
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            };
        });

        // Insere as tags no banco de dados.
        await knex("tags").insert(tagsInsert);

        // Retorna uma resposta de sucesso.
        response.json();
    }

    // Método assíncrono para mostrar detalhes de um filme.
    async show(request, response){
        // Extrai o ID da nota (filme) da URL.
        const { id } = request.params;

        // Obtém a nota (filme) do banco de dados.
        const note = await knex("movie_notes").where({ id }).first();

        // Obtém as tags associadas à nota.
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");


        // Retorna um objeto JSON contendo os detalhes do filme.
        return response.json({
            ...note,
            tags,
        });
    }

    // Método assíncrono para deletar um filme.
    async delete(request, response){
        // Extrai o ID da nota (filme) da URL.
        const { id } = request.params;

        // Deleta a nota (filme) do banco de dados.
        await knex("movie_notes").where({ id }).delete();

        // Retorna uma resposta de sucesso.
        return response.json();
    }

    // Método assíncrono para listar filmes com base em filtros.
    async index(request, response){
        // Extrai parâmetros de consulta da URL.
        const { title, user_id, tags } = request.query;

        let notes;

        // Verifica se há filtros por tags.
        if(tags){
            // Filtra as tags e mapeia para o formato esperado pelo banco de dados.
            const filterTags = tags.split(',').map(tag => tag.trim());

            // Consulta filmes com base nas tags.
            notes = await knex("tags")
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id",
                ])
                .where("movie_notes.user_id", user_id)
                .whereLike("movie_notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("movie_notes", "movie_notes.id", "tags.note_id")
                .orderBy("movie_notes.title");
        } else {
            // Consulta filmes sem filtros por tags.
            notes = await knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        // Obtém todas as tags associadas ao usuário.
        const userTags = await knex("tags").where({ user_id });

        // Mapeia as notas para incluir informações sobre tags.
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            };
        });

        // Retorna uma resposta JSON contendo a lista de filmes.
        return response.json(notesWithTags);
    }
}

// Exporta a classe MoviesController para ser utilizada em outras partes do aplicativo.
module.exports = MoviesController;
