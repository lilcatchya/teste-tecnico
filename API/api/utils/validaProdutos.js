module.exports = async function validaProdutos(dadosDoBanco, itensRecebidos) {

  try {
    const itens = itensRecebidos.map((itemRecebido) => {

      let itemDoBanco = dadosDoBanco.find((itemDoBanco) => Number(itemRecebido.product_code) == itemDoBanco.code)
      let errors = {}

      if (!verificaSeExiste(itemDoBanco, itemRecebido.product_code, itemRecebido.new_price, errors)) {
        return { ...itemRecebido, errors }
      }

      let cost_price = parseFloat(itemDoBanco.cost_price)
      let new_price = parseFloat(itemRecebido.new_price)
      let sales_price = parseFloat(itemDoBanco.sales_price)


      const ehValido = verificacoes(itemDoBanco.code, itemRecebido.product_code, cost_price, sales_price, new_price, errors)

      if (Object.keys(errors).length !== 0) {
        return { ...itemRecebido, ehValido, errors }
      } else {
        return { ...itemRecebido, ehValido }
      }

    })

    for (i = 0; i < itens.length; i++) {
      if (itens[i].ehValido) {
        valido = true
      } else {
        valido = false
        throw itens
      }
    }

    console.log('Todos os produtos foram validados e estão prontos para serem atualizados.')
    return itens
  } catch (error) {

    console.log('Foram encontrados os seguintes erros:')
    for (i = 0; i < error.length; i++) {
      if (error[i].errors) {
        console.error('Erro:', error[i].errors);
      }
    }
    return false
  }
}

function verificacoes(codigoDoProdutoNoBanco, codigoDoProdutoRecebido, cost_price, sales_price, new_price, errors) {
  let verificacao1 = verificaCamposPreenchidos(codigoDoProdutoRecebido, new_price, errors)
  let verificacao2 = verificaPrecoDeCusto(codigoDoProdutoNoBanco, cost_price, new_price, errors)
  let verificacao3 = verificaDezPorCento(codigoDoProdutoNoBanco, cost_price, sales_price, new_price, errors)


  if (
    verificacao1 &&
    verificacao2 &&
    verificacao3
  ) {
    return true
  } else {
    return false
  }
}

function verificaSeExiste(item, codigo, preco, errors) {
  if (item === undefined) {

    verificaCamposPreenchidos(codigo, preco, errors)

    errors.produtoInexistente = `Produto de código ${codigo} não existe no banco de dados.`

    return false
  } else {
    return true
  }
}

function verificaCamposPreenchidos(codigo, preco, errors) {
  let temErro
  if (codigo == "") {
    errors.semCodigo = `Produto com campo de código vazio.`
    temErro = false
  } if (preco == "" || isNaN(preco)) {
    errors.semPreco = `Produto de código ${codigo} com campo de preço inválido ou vazio.`
    temErro = false
  } else {
    return true
  }
  return temErro
}

function verificaPrecoDeCusto(code, cost_price, new_price, errors) {
  if (cost_price > new_price) {
    errors.precoDeCusto = `Preço abaixo do valor de custo no item ${code}, valores permitidos acima de ${cost_price}.`
    return false
  } else {
    return true
  }
}

function verificaDezPorCento(code, cost_price, sales_price, new_price, errors) {
  let dezPorCento = (0.1 * sales_price).toFixed(2)
  dezPorCento = parseFloat(dezPorCento)

  if (new_price > sales_price + dezPorCento || new_price < sales_price - dezPorCento) {
    let praMenos = (sales_price - dezPorCento).toFixed(2)
    let praMais = (sales_price + dezPorCento).toFixed(2)

    if (cost_price > praMenos) {
      errors.dezPorCento = `Novo valor excede a faixa de 10% de diferença no item ${code}, valores permitidos dentro da faixa de ${cost_price} e ${praMais}.`
    } else {
      errors.dezPorCento = `Novo valor excede a faixa de 10% de diferença no item ${code}, valores permitidos dentro da faixa de ${praMenos} e ${praMais}.`
    }
    return false
  } else {
    return true
  }
}