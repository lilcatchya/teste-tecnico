const { Router } = require('express')
const ProductController = require('../controllers/Controller')
const upload = require('../utils/configuraMulter.js')

const router = Router()

router.get('/products', ProductController.pegaTodosOsProdutos)
router.get('/products/:code', ProductController.pegaUmProduto)
router.post('/products/validar', upload.single('csvFile'), ProductController.validacao)
router.put('/products/atualizar', upload.single('csvFile'), ProductController.validacao)


module.exports = router