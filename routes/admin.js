let express = require('express');
let router = express.Router();
const multer = require('multer');
const path =  require('path')

let servicosController = require('../controllers/servicosController');

const storage = multer.diskStorage({
/** destino do arquivo upload */
destination: function (req, file, cb) {
    cb(null, path.join('uploads'))
},
/** nome do arquivo upload */
filename: function (req, file, cb) {
    /** nome do arquivo + data e hora + extensão */
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
}
})

const upload = multer({ storage: storage })

/* Painel administrativo*/
router.get('/', (req, res) => {
    console.log('oi');
    res.render('admin', {titulo: 'Painel Administrativo'});
});

/* Serviços */

router.get('/servicos', servicosController.index);
router.get('/servicos/cadastro', servicosController.cadastro);
router.post('/servicos/cadastro', upload.single('ilustracao'), servicosController.salvar);

module.exports = router;
