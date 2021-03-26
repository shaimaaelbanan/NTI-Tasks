const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const app = express()
app.use(adminBro.options.rootPath, router)
app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
module.exports = app

