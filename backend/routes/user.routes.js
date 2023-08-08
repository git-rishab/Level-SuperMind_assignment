const express = require("express");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already Registered' });
        }
        await User.create({ name, email, password });
        res.status(201).json({ "ok":true,"message": 'Signup successful!' });
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

userRoute.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email, password } });
        if(user){
            const token = jwt.sign({ id: user.id },process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ "ok":true,"message": 'Login successful!', token });
        } else {
            res.status(401).json({ "ok":false,"message": 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

userRoute.delete("/del", async(req,res)=>{
    await User.drop();
    await Post.drop();
    await Comment.drop();
})

module.exports = {
    userRoute
}