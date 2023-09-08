const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors');

module.exports = app => {
  app.use(cors({origin: '*'}))
  app.use(bodyParser.json())
  app.use(router)
}