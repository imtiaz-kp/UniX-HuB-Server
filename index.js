//loads .env file content into process.env by default.
require('dotenv').config()
const express = require('express')
const cors= require('cors')

const router=require('./Routes/router')
// const appMiddleware = require('./Middlewares/appMiddleware')
require('./DB/connection')
//create an express application
const UxServer= express()

UxServer.use(cors())
UxServer.use(express.json())
// UxServer.use(appMiddleware)
UxServer.use(router)
UxServer.use('/uploads',express.static('./uploads'))
//router should use after use cors and json parse

//customise the prot no
const PORT = 4000  || process.env.PORT
//run server app 
UxServer.listen(PORT,()=>{
    console.log(`UniX Server started at port no ${PORT} and waiting for the client requests!!`);
})
 
UxServer.get('/',(req,res)=>{
    res.send(`<h1>UniX Server started and waiting for the client request!!!</h1>`)
})

