const express = require("express");
const { Post } = require("../models/post.model");

const blogRoute = express.Router();

blogRoute.post("/create", async(req, res) => {
    const { title, content } = req.body;
    // const userId = req.user.id;
    try {
      const newPost = await Post.create({ title, content});
      res.status(201).json({ message: 'Blog post created successfully!', post: newPost });
    } catch (error) {
      res.status(500).json({ message: 'Error creating blog post' });
    }
})

module.exports = {
    blogRoute
}