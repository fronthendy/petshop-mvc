const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

/** http://localhost:3000/cadastro */
router.get('/cadastro', usuariosController.cadastro);

/** http://localhost:3000/cadastro */
router.post('/cadastro', usuariosController.salvar);

/** http://localhost:3000/login */
router.get('/login', usuariosController.login);

/** http://localhost:3000/login */
router.post('/login', usuariosController.autenticacao);

module.exports = router;
