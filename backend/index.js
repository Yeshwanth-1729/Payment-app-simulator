//url: mongodb+srv://rinkuayr:Mb82urmQh7u5HzxL@cluster0.fmsoacl.mongodb.net/
const express = require("express");
const mainRouter=require("./Routes/index");
const app=express();
const PORT=3004;

app.use(express.json());
const cors=require("cors");
app.use(cors());
console.log("in indexjs");
app.use("/api/v1/",mainRouter);
app.listen(PORT,()=>{
    console.log("Server on port:  ",PORT);
})