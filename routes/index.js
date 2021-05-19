const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');
const institucionalController = require('../controllers/institucionalController');

// rotas para paginas institucionais

// http://localhost:3000/
router.get('/', institucionalController.index);

// rota para /pets que retorna o método index da petsController
router.get('/pets', petsController.index);

router.get('/pets/:nome', petsController.show);

module.exports = router;
