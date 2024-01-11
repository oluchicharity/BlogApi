
const mongoose= require("mongoose")

const dbhost= "localhost:27017"

const dbname= "myBlog"

const connection= mongoose.connect(`mongodb://${dbhost}/${dbname}`).then(()=>{
    console.log(`connected to mongoose successfully`)

}).catch((error)=>{
  console.log(error.message)
})

