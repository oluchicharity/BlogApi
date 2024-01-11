
const mongoose= require("mongoose")
const bcrypt= require("bcrypt")

const blogSchema= new mongoose.Schema({
  title:{
    type:String
    
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
},
  content:{
    type:String
  },
  email:{
    type:String,
    required:true
  },
  author:{
    type:String
  },
  comments:[{
    Text:String
  }],
  likes:[{
    type:Number,
    default:0
   
  }],
  shares:{
    type:Number,
    default:0
    
  }


},{timestamps:true})

 blogSchema.pre("save", async function (next){
    const salt= await bcrypt.genSaltSync(12)
    this.password= await bcrypt.hash(this.password,salt)
 })
 blogSchema.methods.isPasswordMatched= async function (enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password)
}


const blogModel= mongoose.model("Blog",blogSchema)



module.exports=blogModel


