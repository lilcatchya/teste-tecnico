const database = require('../models')

class ProductController {
  static async pegaTodosOsProdutos(req, res) {
    try {
      const todosOsProdutos = await database.products.findAll()
      return res.status(200).json(todosOsProdutos)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = ProductController