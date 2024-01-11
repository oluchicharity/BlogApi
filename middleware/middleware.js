const jwt= require("jsonwebtoken");
const blogModel = require("../models/models");
require("dotenv").config();

const auth= async(req,res,next)=>{
   try {
    const authorizations= req.headers.authorization
    if(!authorizations){
        return res.status(400).json(`this user is not authorized`)
    }
    const token= authorizations.split(" ")[1]

    const decodeToken= jwt.verify(token,process.env.SECRET)
    if(!decodeToken){
       return  res.status(404).json(`invalid token`)
    }
    const user= await blogModel.findById(decodeToken.id)
    if(!user){
        return res.status(404).json(`authenticator failed,user not found`)
    }
    req.user=decodeToken
     
    next()
   } catch (error) {
    res.send(error.message)
   }
   
}
module.exports=auth