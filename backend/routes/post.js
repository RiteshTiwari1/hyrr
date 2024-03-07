const express = require('express');
const router = express.Router();

const { Post} = require("../db");
const { authMiddleware } = require('../middleware');

router.post('/create',authMiddleware, async (req, res) => {

    try {
      const { content } = req.body;
      
      const newPost = await Post.create({
        content,
      });
  
      res.json({
        message: 'Post created successfully',
        post: newPost,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });


  router.get('/all', authMiddleware, async (req, res) => {
    try {
      // Retrieve all posts from the database
      const allPosts = await Post.find();
  
      res.json({
        message: 'Successfully retrieved all posts',
        posts: allPosts,
      });
    } catch (error) {
      console.error('Error retrieving posts:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });
  
  
  
  module.exports = router;
  