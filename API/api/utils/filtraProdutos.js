const database = require('../models')
const { Op } = require('sequelize')

module.exports = async function filtraProdutos(itensRecebidos) {
  try {
    const productCodes = itensRecebidos.map((produto) => Number(produto.product_code))

    const produtos = await database.products.findAll({
      where: { code: { [Op.or]: productCodes } }
    })

    const packs = await database.packs.findAll({
      where: { product_id: { [Op.or]: productCodes } }
    })

    return [produtos, packs]
  } catch (error) {
    return console.log(error)
  }
}