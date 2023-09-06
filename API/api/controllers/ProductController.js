const database = require('../models')
const { converteCSV, filtraProdutos } = require('../utils/index.js')

class ProductController {
  static async pegaTodosOsProdutos(req, res) {
    try {
      const todosOsProdutos = await database.products.findAll()
      return res.status(200).json(todosOsProdutos)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmProduto(req, res) {
    const { code } = req.params
    try {
      const produto = await database.products.findOne({ where: { code: Number(code) } })
      return res.status(200).json(produto)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async validacao(req, res) {
    try {
      const dadosConvertidos = await converteCSV(req.file.buffer)

      const dadosDoBanco = await filtraProdutos(dadosConvertidos)

      return res.status(200).json({ dadosDoBanco: dadosDoBanco, dadosConvertidos: dadosConvertidos })

    } catch (error) {

      return console.error(error);
    }
  }
}

module.exports = ProductController