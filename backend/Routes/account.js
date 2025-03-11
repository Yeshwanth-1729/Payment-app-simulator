const express=require("express");
const router=express.Router();
const { authmiddleware } =require("../middlewares/middleware");
const { Account, User } =require("../db") 
const zod=require("zod");
const mongoose=require("mongoose");
console.log("reached account.js");
router.get("/balance", authmiddleware, async (req, res) => {
    //console.log(req.userId);
    const account = await Account.findOne({
        userId: req.userId
    });
    console.log(account);
    return res.json({
        balance: account.balance
    })
});
const transferSchema=zod.object({
    to: zod.string(),
    amount: zod.string(),
})
router.post("/transfer",authmiddleware,async (req,res)=>{
    const { success } =transferSchema.safeParse(req.body);
    if(!success){
        return res.json({
            msg: "incorrect input format"
        })
    }
    const session=await mongoose.startSession();

    session.startTransaction();

    const { amount,to }=req.body;
    const amount1=Number(amount);
    const account=await Account.findOne({userId:req.userId}).session(session).exec();
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(211).json({
            msg: "Insufficient Balance",
        })
    }
    const receiverAcc=await Account.findOne({userId:to}).session(session).exec();
    if(!receiverAcc){
        await session.abortTransaction();
        return res.status(212).json({
            msg:"Reciever account not found ",
        })
    }

    await Account.updateOne({userId:req.userId},{ $inc:{ balance: -amount1 }}).session(session);
    await Account.updateOne({userId:to},{ $inc:{ balance: +amount1 }}).session(session);
    
    await session.commitTransaction();
    console.log("transaction successfull");
    res.status(200).json({
        msg: "Transfer successfull",
    })
})
module.exports=router;

