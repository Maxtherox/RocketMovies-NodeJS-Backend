// Importa funções 'hash' e 'compare' do módulo 'bcryptjs'.
const { hash, compare } = require('bcryptjs');

// Importa a classe de erro personalizada (AppError).
const AppError = require("../utils/AppError");

// Importa a função de conexão SQLite.
const sqliteConnection = require("../database/sqlite");

// Declaração da classe UsersController.
class UsersController {
    // Método assíncrono para criar um novo usuário.
    async create(request, response){
        // Extrai dados do corpo da requisição.
        const { name, email, password } = request.body;

        // Conecta ao banco de dados SQLite.
        const database = await sqliteConnection();

        // Verifica se o usuário com o mesmo e-mail já existe.
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists) {
            throw new AppError("E-mail já cadastrado.");
        }

        // Gera uma senha criptografada.
        const hashedPassword = await hash(password, 8);

        // Insere o novo usuário no banco de dados.
        await database.run(
            "INSERT INTO users (name, email, password) VALUES(?,?,?)", 
            [name, email, hashedPassword]
        );

        // Retorna resposta de sucesso (status 201 - Created).
        return response.status(201).json();
    }

    // Método assíncrono para atualizar informações do usuário.
    async update(request, response){
        // Extrai dados do corpo da requisição e parâmetros da URL.
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        // Conecta ao banco de dados SQLite.
        const database = await sqliteConnection();

        // Obtém o usuário com base no ID.
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        // Verifica se o usuário existe.
        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        // Verifica se o novo e-mail já está em uso por outro usuário.
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso");
        }

        // Atualiza as informações do usuário.
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // Verifica e atualiza a senha, se fornecida.
        if (password && !old_password) {
            throw new AppError("Informe a senha antiga para prosseguir!");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword){
                throw new AppError("Senha antiga incorreta.");
            }

            user.password = await hash(password, 8);
        }

        // Executa a atualização no banco de dados.
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );

        // Retorna resposta de sucesso (status 200 - OK).
        return response.status(200).json();
    }
}

// Exporta a classe UsersController para ser utilizada em outras partes do aplicativo.
module.exports = UsersController;
