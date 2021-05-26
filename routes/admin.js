let express = require('express');
let router = express.Router();
let servicosController = require('../controllers/servicosController');

/* Painel administrativo*/
router.get('/', (req, res) => {
    console.log('oi');
    res.render('admin', {titulo: 'Painel Administrativo'});
});

/* Serviços */

router.get('/servicos', servicosController.index);
router.get('/servicos/cadastro', servicosController.cadastro);
router.post('/servicos/cadastro', servicosController.salvar);

module.exports = router;
