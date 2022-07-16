const express = require('express');
const cors = require('cors');
const routerV1 = require('./routes/v1/v1.routes')
const morgan = require('morgan')

const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('combined'))
//routers
app.use(routerV1)


module.exports = app