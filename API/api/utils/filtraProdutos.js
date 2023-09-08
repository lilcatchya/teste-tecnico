const database = require('../models')
const { Op } = require('sequelize')

module.exports = async function filtraProdutos(itensRecebidos) {
  try {
    const productCodes = itensRecebidos.map((produto) => Number(produto.product_code))

    let produtos = await database.products.findAll({
      where: { code: { [Op.or]: productCodes } }
    })

    let packs = await database.packs.findAll({
      where: { product_id: { [Op.or]: productCodes } }
    })

    return dadosNoBanco = produtos.concat(packs)
  } catch (error) {
    return console.log(error)
  }
}