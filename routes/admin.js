const express = require('express'); // chama modulo express
const multer = require('multer'); // chama modulo multer (upload)
const path = require('path'); // chama modulo path (caminho de arquivos)
const router = express.Router(); // chama metodo que gerencia rotas
const servicosController = require('../controllers/servicosController');
const validaCadastroServico = require('../middlewares/validacao/servico');

/** configurações do multer */
const storage = multer.diskStorage({
    /** destino do upload */
    destination: (req, file, cb) => {
        /** guarda arquivos na pasta /uploads */
        cb(null, path.join('uploads'));
    },
    /** nome do upload */
    filename: (req, file, cb) => {
        /** salva arquivo com nome do campo + data e hora + extensão */
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

/** usando configuração como storage do multer */
const upload = multer({ storage: storage });

/* http://localhost:3000/admin */
router.get('/', (request, response) => {
    response.render('admin', { titulo: 'Painel Administrativo' });
});

/* http://localhost:3000/admin/servicos */
router.get('/servicos', servicosController.index);

/* http://localhost:3000/admin/servicos/cadastro */
router.get('/servicos/cadastro', servicosController.cadastro);

/* http://localhost:3000/admin/servicos/cadastro */
router.post('/servicos/cadastro', upload.single('ilustracao'), validaCadastroServico, servicosController.salvar);

/* http://localhost:3000/admin/servicos/editar */
router.get('/servicos/editar/:id', servicosController.editar);

/* http://localhost:3000/admin/servicos/editar/:id/?_method=PUT */
router.put('/servicos/editar/:id', upload.single('ilustracao'), validaCadastroServico, servicosController.atualizar);

/* exporta as rotas */
module.exports = router;