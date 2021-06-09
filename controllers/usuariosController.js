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
    index: (request, response) => {
        /* renderiza a view adminusuarios e passa informações dinamicas */
        return response.render('adminUsuarios', { titulo: 'Serviços', usuarios });
    },
    cadastro: (request, response) => {
        /* renderiza formulario de cadastro */
        return response.render('usuariosCadastro', { titulo: 'Cadastrar Serviço' });
    },
    salvar: (request, response) => {
        let { nome, descricao, preco } = request.body;

        /** pegando o nome do arquivo (upload) */
        let ilustracao = request.file.filename;
        /** adiciona o novo serviço no array */
        usuarios.push({ id: uuid(), nome, descricao, preco, ilustracao });
        /** converter o array para json */
        let dadosJson = JSON.stringify(usuarios);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(usuariosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/usuarios');
    },
    editar: (request, response) => {
        /** pegando parametro id da URL */
        let {id} = request.params;
        /** busca serviço pelo id */
        let servicoEncontrado = usuarios.find(servico => servico.id == id);
        /** renderiza view e manda titulo e obj do serviço */
        return response.render('usuariosEditar', { titulo: 'Editar Serviços', servico: servicoEncontrado })

    },
    atualizar: (request, response) => {
        /** pegando parametro id da URL */
        let { id } = request.params;
        /** pegando informações do formulário */
        let { nome, descricao, preco } = request.body;
        /** busca serviço pelo id */
        let servicoEncontrado = usuarios.find(servico => servico.id == id);
        
        /** atribuir os novos valores ao servicoEncontrado */
        servicoEncontrado.nome = nome;
        servicoEncontrado.descricao = descricao;
        servicoEncontrado.preco = preco;
        /** verifica se tem uma nova imagem antes de atribuir */
        if(request.file){
            servicoEncontrado.ilustracao = request.file.filename;
        }

        /** converter o array para json */
        let dadosJson = JSON.stringify(usuarios);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(usuariosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/usuarios');

    }
}

module.exports = usuariosController;