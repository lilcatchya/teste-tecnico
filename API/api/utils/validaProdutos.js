module.exports = async function validaProdutos(dadosDoBanco, itensRecebidos) {

  try {
    const itens = dadosDoBanco.map((itemDoBanco, index) => {

      let cost_price = parseFloat(itemDoBanco.cost_price)
      let new_price = parseFloat(itensRecebidos[index].new_price)
      let sales_price = parseFloat(itemDoBanco.sales_price)
      let errors = {}

      const ehValido = verificacoes(itemDoBanco.code, cost_price, sales_price, new_price, errors)

      if (Object.keys(errors).length !== 0) {
        return { ...itemDoBanco, ehValido, errors }
      } else {
        return { ...itemDoBanco, ehValido }
      }
    })


    let valido

    for (i = 0; i < itens.length; i++) {
      if (itens[i].ehValido) {
        valido = true
      } else {
        valido = false
        throw itens
      }
    }

    return valido

  } catch (error) {
    for (i = 0; i < error.length; i++) {
      if (error[i].errors) {
        console.error('Erro:', error[i].errors);
      }
    }
    return false
  }
}

function verificacoes(code, sales_price, cost_price, new_price, errors) {
  if (
    verificaPrecoDeCusto(code, cost_price, new_price, errors) &&
    verificaDezPorCento(sales_price, new_price)
  ) {
    return true
  } else {
    return false
  }
}

function verificaPrecoDeCusto(code, cost_price, new_price, errors) {
  if (cost_price > new_price) {
    errors.precoDeCusto = `Preço abaixo do valor de custo no item ${code}`
    return false
  } else {
    return true
  }
}

// function verificaDezPorCento(sales_price, new_price) {
//   let dezPorCento = (0.1 * sales_price).toFixed(2)

//   if (new_price > sales_price + dezPorCento || new_price < sales_price - dezPorCento) {
//     let praMenos = sales_price - dezPorCento
//     let praMais = sales_price + dezPorCento
//     praMenos
//     praMais

//     validado = false
//     item = itensRecebidos[index].product_code
//     throw new Error(`Novo valor excede a faixa de 10% de diferença no item ${item}, valores permitidos dentro da faixa de ${praMenos} e ${praMais}`);
//   }
// }