const fs = require('fs');
const path = require('path');
const {uuid} = require('uuidv4');

const servicosJson = path.join("servicos.json");

const servicosController = {
    index: (request, response) => {
        let servicos = fs.readFileSync(servicosJson, {encoding:'utf-8'})
        servicos = JSON.parse(servicos);
        console.log(servicos)

        return response.render('adminServicos', {titulo: 'Serviços', servicos});
    },
    cadastro: (request, response) => {
        return response.render('servicosCadastro', {titulo: 'Serviços'});
    },
    salvar: (request, response) => {
        const {nome, descricao, preco, ilustracao} = request.body;

        console.log({id: uuid(), nome, descricao, preco, ilustracao});
        let dadosJson = JSON.stringify([{id: uuid(),nome, descricao, preco, ilustracao}]);

        fs.writeFileSync(servicosJson, dadosJson);

        response.redirect('/admin/servicos');
    }
}

module.exports = servicosController;