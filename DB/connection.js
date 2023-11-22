const mongoose = require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb Atles successfully connected with unix server");
}).catch((err)=>{
    console.log(` Mongodb connection failed !!! Error:${err}`);
})