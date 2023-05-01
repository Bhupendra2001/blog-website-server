const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const route = require('./router')
const multer = require('multer')
const CP = require('cookie-parser')
const app = express()
app.use(cors())
app.use(express.json())
app.use(multer().any())
app.use(CP())

mongoose.connect(process.env.MongoUrl, {useNewUrlParser : true})
.then(()=> console.log("mongodb is connected"))
.catch((err)=> console.log(err))

app.use('/', route)

app.listen(process.env.PORT , ()=> {
    console.log("server started in port number " + process.env.PORT)
})