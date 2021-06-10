const bcrypt = require('bcrypt');
/** módulo instalado para manipulação de arquivos */
const fs = require('fs');
/** modulo nativo para manipulação de arquivos */
const path = require('path');
/** modulo instalado para gerar id */
const { uuid } = require('uuidv4');

/** caminho do arquivo json */
const usuariosPath = path.join('usuarios.json');
/** lê conteúdo do arquivo json */
let usuarios = fs.readFileSync(usuariosPath, { encoding: 'utf-8' });
/** converte JSON para array */
usuarios = JSON.parse(usuarios);

const usuariosController = {
    cadastro: (request, response) => {
        response.render("cadastro", { titulo: "Cadastre-se" })
    },
    salvar: (request, response) =>{
        const { nome, email, senha } = request.body;
        /** criptografa a senha */
        const senhaCrypt = bcrypt.hashSync(senha, 10);
        /** adiciona novo usuario na lista para o JSON */
        usuarios.push({ id: uuid(), nome, email, senha: senhaCrypt });

        /** converter o array para json */
        let dadosJson = JSON.stringify(usuarios);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(usuariosPath, dadosJson);

        /** redireciona para Login */
        response.redirect("/login");
    },
    login: (request, response) => {
        response.render("login", { titulo: "Login" })
    },
    autenticacao: (request, response) => {
        const { email, senha } = request.body;

        /** busca usuario pelo email */
        const usuarioEncontrado = usuarios.find(usuario => usuario.email == email);

        if(usuarioEncontrado && bcrypt.compareSync(senha, usuarioEncontrado.senha)){
            /** usuario autenticado */
            /** cria a sessão e guarda informações do usuario logado */
            request.session.usuarioLogado = usuarioEncontrado;
            /** redireciona para pagina inicial */
            response.redirect('/');
        } else {
            /** usuario não autenticado */
            response.redirect('/login');
        }

    }
}

module.exports = usuariosController;