const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Petshop' });
});

// rota para /pets que retorna o método index da petsController
router.get('/pets', petsController.index);

router.get('/pets/:nome', petsController.show);

module.exports = router;
