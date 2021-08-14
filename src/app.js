require('dotenv').config();
const express = require('express')
require('express-async-errors')
const cors = require('cors');
const router = require('./routes')

const morgan = require('morgan')
const helmet = require('helmet')
// const swaggerUI = require('swagger-ui-express');
// const swaggerDoc = require('./utils/swagger')
const errorHandler = require('./middlewares/errorHandler');

const app =express();
// const morganLog = process.env.NODE_ENV==='production' ? morgan('common') : morgan('dev');
// app.use(morganLog)
app.use(helmet())
app.use(express.json())
// app.use('/api-docs', swaggerUI.server, swaggerUI.setup(swaggerDoc))
app.use('/api', router)
app.use(cors())
app.use(errorHandler)




module.exports= app;