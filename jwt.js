const jwt= require("jsonwebtoken")

const gentoken=(id)=>{
    return  jwt.sign({id}, 
        process.env.SECRET, {expiresIn:"2d"})
 } 
 module.exports={gentoken}