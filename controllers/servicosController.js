const fs = require('fs');
const path = require('path');
const {uuid} = require('uuidv4');

const servicosPath = path.join("servicos.json");
let servicos = fs.readFileSync(servicosPath, {encoding:'utf-8'});
servicos = JSON.parse(servicos) 

const servicosController = {
    index: (request, response) => {
        return response.render('adminServicos', {titulo: 'Serviços', servicos});
    },
    cadastro: (request, response) => {
        return response.render('servicosCadastro', {titulo: 'Serviços'});
    },
    salvar: (request, response) => {
        const {nome, descricao, preco} = request.body;
        const ilustracao = request.files[0].originalname;
        servicos.push({id: uuid(),nome, descricao, preco, ilustracao}); //adiciona no array
        let dadosJson = JSON.stringify(servicos); // converte para json
        fs.writeFileSync(servicosPath, dadosJson); // guarda no arquivo

        return response.redirect('/admin/servicos');
    }
}

module.exports = servicosController;