const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors');

module.exports = app => {
  app.use(bodyParser.json())
  app.use(router)
  app.use(cors({origin: '*'}))
}