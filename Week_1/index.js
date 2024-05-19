const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.listen(3030, () => {
    console.log(`Server Started a ${3030}`)
})

require('dotenv').config();

const mongString = process.env.DATABASE_URL

mongoose.connect(mongString)

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})