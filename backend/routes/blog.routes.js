const express = require("express");
const { Post } = require("../models/post.model");

const blogRoute = express.Router();

blogRoute.get("/get", async(req,res)=>{
  try {
    const blogs = await Post.findAll();
    res.status(200).send({"ok":true, blogs})
  } catch (error) {
    res.status(500).json({ "ok":false, message: error.message });
  }
})

blogRoute.post("/create", async(req, res) => {
    const { title, content } = req.body;
    // const userId = req.user.id;
    try {
      const newPost = await Post.create({ title, content});
      res.status(201).json({ message: 'Blog post created successfully!', post: newPost });
    } catch (error) {
      res.status(500).json({ "ok":false, message: error.message });
    }
})

module.exports = {
    blogRoute
}