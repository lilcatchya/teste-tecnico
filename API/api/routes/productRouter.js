const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const router = Router()

router.get('/products', ProductController.pegaTodosOsProdutos)

module.exports = router