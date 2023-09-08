const express = require('express')
const routes = require('./routes')

const app = express()
const port = 8000

routes(app)

app.listen(port, () => console.log(`servidor ouvindo na porta ${port}`))