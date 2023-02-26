
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use('/api', tourRoutes)
app.use('/api', userRoutes)


module.exports = app




