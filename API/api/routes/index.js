const bodyParser = require('body-parser')
const products = require('./productRouter')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(products)
}