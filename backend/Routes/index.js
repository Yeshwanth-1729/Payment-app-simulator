const express = require("express");
const app = express();
const userRouter = require("./user");
console.log(userRouter);
console.log("account router-1");
const accountRouter=require("./account");
console.log("account router-2");
console.log(accountRouter);
// Middleware
app.use(express.json());

// Mounting User Router
app.use("/user", userRouter);
app.use("/account",accountRouter);

module.exports = app;