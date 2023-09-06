const database = require('../models')

module.exports = async function filtraProdutos(dadosConvertidos) {
  try{
    const promessasDoBanco = dadosConvertidos.map((produto) => {
      return database.products.findOne({ where: { code: Number(produto.product_code) } });
    });

    const dadosDoBanco = await Promise.all(promessasDoBanco)

    return dadosDoBanco
  } catch(error) {
    return console.log(error)
  }
}