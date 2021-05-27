const express = require('express'); // chama modulo express
const router = express.Router(); // chama metodo que gerencia rotas
const servicosController = require('../controllers/servicosController');

/* http://localhost:3000/admin */
router.get('/', (request, response) => {
    response.render('admin', { titulo: 'Painel Administrativo' });
});


/* http://localhost:3000/admin/servicos */
router.get('/servicos', servicosController.index);

/* http://localhost:3000/admin/servicos/cadastro */
router.get('/servicos/cadastro', servicosController.cadastro);


/* exporta as rotas */
module.exports = router;