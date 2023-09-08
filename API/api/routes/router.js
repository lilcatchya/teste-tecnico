const { Router } = require('express')
const Controller = require('../controllers/Controller')
const upload = require('../utils/configuraMulter.js')

const router = Router()

router.get('/products', Controller.pegaTodosOsProdutos)
router.get('/products/:code', Controller.pegaUmProduto)
router.post('/products/validar', upload.single('csvFile'), Controller.validacao)
router.put('/products/atualizar', upload.single('csvFile'), Controller.atualizacao)

router.get('/packs', Controller.pegaTodosOsPacks)

module.exports = router