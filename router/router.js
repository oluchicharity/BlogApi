const express= require("express")

const{ createUser, login, post, getAllPosts, getOne, update, deletep, comment, getcomments, deleteComments, getLikes, sharePost, likePost }=require("../controller/controller")

const auth=require("../middleware/middleware")
const{validatingCreateUser}=require("../validation/validation")
const {validateLogin}=require('../validation/validation')

const router= express.Router()

router.post("/create",createUser),
router.post("/login",login)
router.post("/post",post)
router.get("/getAll",getAllPosts)
router.get("/getOne/:id",getOne)
router.put("/update/:id",update)
router.delete("/delete/:id",deletep)
router.post("/comment/:id",comment)
router.get("/getcomments/:id",getcomments)
// router.delete('/deleteComment/:postId/comments/:commentId',deleteComments)
router.post("/likeapost/:id",likePost)
router.get("/likes/:id",getLikes)
router.post("/sharePost/:id",sharePost)

module.exports= router