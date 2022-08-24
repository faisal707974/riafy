const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const db = require('./database_config/DB_connection')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

const router1 = require('./routes/router1')

db.connect((err) => {
    if (err) console.log('Database connection error : ' + err)
    else console.log('Database connected')
})

app.use('/', router1)

app.listen(process.env.PORT, () => { 
    console.log(`server started running in port : ${process.env.PORT}`)
})