/** Middleware - validação de cadastro de serviço */
const servico = (request, response, next) => {
    let { nome, preco, descricao } = request.body;

    if ( nome == "" ||  preco == "" || descricao == "" ) {
        // retorna mensagem e erro
        response.send("Preencha todos os campos obrigatórios!");
        // response.render("servicoCadastro", { erro: 'Preencha todos os campos obrigatórios!' });
    } else if (nome.length < 3 || nome.length > 15 || preco.length < 0) {
        response.send("Preencha os campos corretamente!");
    } else {
        /** executa proxima função/controller */
        next();
    }
}

module.exports = servico;