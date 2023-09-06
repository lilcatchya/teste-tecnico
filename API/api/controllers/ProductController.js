const database = require('../models')
const { converteCSV } = require('../utils/index.js')

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

      const produtosParaConsultar = dadosConvertidos.map((produto) => {
        return database.products.findOne({ where: { code: Number(produto.product_code) } });
    });

    const dadosDoBanco = await Promise.all(produtosParaConsultar);

      return res.status(200).json({dadosDoBanco: dadosDoBanco, dadosConvertidos: dadosConvertidos})

    } catch (error) {
      
      return console.error(error);
    }
  }
}

module.exports = ProductController