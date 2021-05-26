const servicosController = {
    index: (request, response) => {
        return response.render('adminServicos', { titulo: 'Serviços', servicos: [] });
    },
    show: (request, response) => {
        // console.log(request.params);
        // pegando parametro nome da rota /servicos/:nome
        const {nome} = request.params;

        return response.send(`exibindo detalhes do serviço ${nome}`);
    }
}

module.exports = servicosController;