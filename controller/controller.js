const express= require("express")
const blogModel = require("../models/models")
const {gentoken}=require("../jwt")
require("dotenv").config()
require("../models/models")
require("../validation/validation")

const createUser=async (req,res)=>{
    try {
        const{name,mobile,password,email}= req.body
        if(!name || !mobile || !password || !email){
            return res.status(400).json(`fields are required`)}
        
            const user= await blogModel.create(req.body)
            return res.json(user)
        
    } catch (error) {
        res.send(error.message)
    }
}


const login= async (req,res)=>{
    try {
        const{email,password}= req.body
        //check if user exist
        const user= await blogModel.findOne({email})
        
        if(user && (await user.isPasswordMatched(password))){
            return res.json({
                id:user.id,
                email:user.email,
                token:gentoken(user.id)
            })
        }   
        else{
            res.json ('invalid credentials')
        }
    } catch (error) {
        res.send(error.message)
    }
    }

    // ...

// Create a post with user information
const post= async (req, res) => {
    try {
      const { title, content, email, mobile, name, password } = req.body;
      
      // Validate that required fields are present
      if (!title || !content || !email || !mobile || !name || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Perform further validation if needed
  
      // Create the post
      const post = await blogModel.create({ title, content, email, mobile, name, password });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAllPosts=async (req, res) => {
    try {
      const posts = await blogModel.find();
      res.json(posts);
    } catch (error) {
      res.send(error.message);
    }
  };

  const getOne=  async (req, res) => {
    try {
      const post = await blogModel.findById(req.params.id);
      res.json(post);
    } catch (error) {
      res.send(error.message);
    }
  };
  
  const update= async(req,res)=>{
    try {
        const userId = req.params.id;

const user = await blogModel.findById(userId);

if (!user) {
  return res.status(404).json({ message: `User not found` });
} else {
  const userData = {
    name: req.body.name || user.name,
    mobile: req.body.mobile || user.mobile,
    password: req.body.password || user.password,
    email: req.body.email || user.email,
  };

  const updatedUser = await blogModel.findByIdAndUpdate(userId, userData, { new: true });

  res.status(200).json({ message: `User ${userId} has been found and updated successfully`, user: updatedUser });
}
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

  const deletep = async (req, res) => {
    try {
      await blogModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.send(error.message);
    }
  };
  
  const comment= async (req, res) => {
    try {
      const post = await blogModel.findById(req.params.id);
  
      // Ensure that the post and comments array are defined
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (!post.comments) {
        post.comments = []; // Initialize comments array if it doesn't exist
      }
    
      post.comments.push({ Text: req.body.Text });
  

      await post.save();
      res.json(post.comments);
    } catch (error) {
      res.send(error.message);
    }
  };
  

 
  const getcomments=async (req, res) => {
    try {
      const post = await blogModel.findById(req.params.id);
      res.json(post.comments);
    } catch (error) {
      res.send(error.message);
    }
  };



//   const deleteComments= async (req, res) => {
//     try {
//       const post = await blogModel.findById(req.params.id);
  
//       // Check if the post is not found
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found here' });
//       }
  
//       // Check if the 'comments' property exists and is not null
//       if (!post.comments || !Array.isArray(post.comments)) {
//         return res.status(404).json({ error: 'Comments not found' });
//       }
  
//       // Find the index of the comment with the given ID
//       const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
  
//       // Check if the comment with the given ID is not found
//       if (commentIndex === -1) {
//         return res.status(404).json({ error: 'Comment not found' });
//       }
  
//       // Remove the comment from the 'comments' array
//       post.comments.splice(commentIndex, 1);
  
//       // Save the updated post
//       await post.save();
  
//       // Respond with the updated comments array
//       res.json(post.comments);
//     } catch (error) {
//       res.send(error.message);
//     }
//   };
  

const likePost = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find the post by ID
      const post = await blogModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Increment the likes by 1
      post.likes += 1;
  
      // Save the updated post
      const updatedPost = await post.save();
  
      // Respond with the updated likes count
      res.json({ likes: updatedPost.likes });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const getLikes = async (req, res) => {
    try {
      const post = await blogModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ likes: post.likes });
    } catch (error) {
      res.send(error.message);
    }
  };
  

const sharePost= async (req, res) => {
    try {
      const post = await blogModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { shares: 1 } },
        { new: true }
      );
      res.json({ shares: post.shares });
    } catch (error) {
      res.send(error.message);
    }
  };

  
  

module.exports={createUser,login,post,getAllPosts,getOne,update,
    deletep,comment,getcomments,likePost,getLikes,sharePost}
