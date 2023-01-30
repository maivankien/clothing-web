require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const connection = require('./config/database')

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

mongoose.set('strictQuery', false)



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
