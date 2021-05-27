const servicosController = {
    index: (request, response) => {
        /* renderiza a view adminServicos e passa informações dinamicas */
        return response.render('adminServicos', { titulo: 'Serviços', servicos: [] });
    },
    cadastro: (request, response) => {
        /* renderiza formulario de cadastro */
        return response.render('servicosCadastro', { titulo: 'Cadastrar Serviço' });
    },
    show: (request, response) => {
        // console.log(request.params);
        // pegando parametro nome da rota /servicos/:nome
        const {nome} = request.params;

        return response.send(`exibindo detalhes do serviço ${nome}`);
    }
}

module.exports = servicosController;