/** Middleware - validação de cadastro de serviço */
const servico = (request, response, next) => {
    let { nome, preco } = request.body;

    if ( nome == "" ||  preco == "" ) {
        // retorna mensagem e erro
        response.send("Preencha todos os campos obrigatórios!");
        // response.render("servicoCadastro", { erro: 'Preencha todos os campos obrigatórios!' });
    } else {
        /** executa proxima função/controller */
        next();
    }
}

module.exports = servico;