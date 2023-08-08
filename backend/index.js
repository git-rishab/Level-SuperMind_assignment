const express = require("express");
const { sequelize } = require("./config/db");
const cors = require("cors");
const { userRoute } = require("./routes/user.routes");
const { blogRoute } = require("./routes/blog.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).send({"ok":true, "message":"Welcome to backend"});
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(5000, ()=>{
    console.log("server running at PORT 5000");
    sequelize.sync().then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
        console.log("Database not connected");
    })
})