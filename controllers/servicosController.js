/** módulo instalado para manipulação de arquivos */
const fs = require('fs');
/** modulo nativo para manipulação de arquivos */
const path = require('path');
/** modulo instalado para gerar id */
const { uuid } = require('uuidv4');

/** caminho do arquivo json */
const servicosPath = path.join('servicos.json');
/** lê conteúdo do arquivo json */
let servicos = fs.readFileSync(servicosPath, { encoding: 'utf-8' });
/** converte JSON para array */
servicos = JSON.parse(servicos);

const servicosController = {
    index: (request, response) => {
        /* renderiza a view adminServicos e passa informações dinamicas */
        return response.render('adminServicos', { titulo: 'Serviços', servicos });
    },
    cadastro: (request, response) => {
        /* renderiza formulario de cadastro */
        return response.render('servicosCadastro', { titulo: 'Cadastrar Serviço' });
    },
    salvar: (request, response) => {
        let { nome, descricao, preco } = request.body;

        /** pegando o nome do arquivo (upload) */
        let ilustracao = request.file.filename;
        /** adiciona o novo serviço no array */
        servicos.push({ id: uuid(), nome, descricao, preco, ilustracao });
        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/servicos');
    },
    editar: (request, response) => {
        let {id} = request.params;
        console.log(request.params.id);
        let servicoEncontrado = servicos.find((servico) => servico.id == id);
        /* renderiza formulario de cadastro */
        return response.render('servicosEditar', { titulo: 'Editar Serviço', servico: servicoEncontrado });
    },
    atualizar: (request, response) => {
        let { id, nome, descricao, preco } = request.body;
        
        let servicoEncontrado = servicos.find((servico) =>  servico.id == id);

        servicoEncontrado.nome = nome;
        servicoEncontrado.descricao = descricao;
        servicoEncontrado.preco = preco;

        if(request.file) {
            servicoEncontrado.ilustracao = request.file.filename;
        }

        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/servicos');
    },
    excluir: (request, response) => {
        let {id} = request.params;

        let servicoEncontrado = servicos.find((servico) => servico.id == id);

        return response.render('servicosExcluir', { titulo: 'Excluir Serviço', servico: servicoEncontrado });
    },
    remover: (request, response) => {
        let {id} = request.params;

        let servicoIndex = servicos.findIndex((servico) => servico.id == id);

        servicos.splice(servicoIndex, 1);
        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/servicos');
    }
}

module.exports = servicosController;