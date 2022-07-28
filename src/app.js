const express = require('express');

const { NODE_ENV } = process.env;
const cors = require('cors');
const routerV1 = require('./routes/v1/v1.routes')



const app = express()

//middlewares
app.use(cors());
app.use(express.json())
if (NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('combined'))
}
//routers
app.use(routerV1)


module.exports = app