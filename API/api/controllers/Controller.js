const database = require('../models')
const { converteCSV, filtraProdutosDoBanco, validaProdutos } = require('../utils/index.js')

class ProductController {
  static async pegaTodosOsProdutos(req, res) {
    try {
      const todosOsProdutos = await database.products.findAll()
      return res.status(200).json(todosOsProdutos)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTodosOsPacks(req, res) {
    try {
      const todosOsPacks = await database.packs.findAll()
      return res.status(200).json(todosOsPacks)
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
      const dadosRecebidos = await converteCSV(req.file.buffer)

      const dadosDoBanco = await filtraProdutosDoBanco(dadosRecebidos)

      const produtosValidados = await validaProdutos(dadosDoBanco, dadosRecebidos)

      

      return res.status(200).json([{ dadosDoBanco: dadosDoBanco, dadosRecebidos: dadosRecebidos }, console.log(produtosValidados)])

      // if (produtosValidados) {
      //   return res.status(200).json({ dadosDoBanco: dadosDoBanco, dadosRecebidos: dadosRecebidos })
      // } else {
      //   throw new Error(error)
      // }

    } catch (error) {

      return console.error(error);
    }
  }
}

module.exports = ProductController