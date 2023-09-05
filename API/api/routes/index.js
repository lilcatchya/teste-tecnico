const bodyParser = require('body-parser')
const products = require('./productRouter')
const packs = require('./packRouter')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(products)
  app.use(packs)
}