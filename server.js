const express = require("express");

require("./config/config")

const app = express();

app.use(express.json());
const router=require("./router/router")
app.use("/Api/v1",router)
const port= 3000
app.listen(port,()=>{
console.log(`listening on port: ${port}: alive and active`)
})