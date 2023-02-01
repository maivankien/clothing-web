require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const route = require('./routes/indexRoutes')
const connection = require('./config/database')

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

mongoose.set('strictQuery', false)


app.use(cookieParser())
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

route(app)

    ; (async () => {
        try {
            await connection()
            app.listen(port, hostname, () => {
                console.log(`Backend NodeJs app listening on port ${port}`)
            })
        } catch (error) {
            console.log(":>>> ERROR: ", error)
        }
    })()
