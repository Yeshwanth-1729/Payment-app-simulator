const express=require("express");
const zod=require('zod');
const router=express.Router();
const { User,Account }=require('../db');
const { JWT_PASS } =require("../config");
const jwt =require("jsonwebtoken");
const { authmiddleware } = require("../middlewares/middleware");

const signupSchema=zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string(),
    password: zod.string(),
})
router.post('/signup/',async (req,res)=>{
    //console.log("in signup router");
    const body=req.body;
    const { success }= signupSchema.safeParse(body);
    if(!success){
        return res.json({
            msg: "incorrect inputs",
        });
    }
    //console.log("safe parsed");
    const existingUser = await User.findOne({ username: body.username }).exec();
    if(existingUser){
        return res.json({
            message: "username already exists",
        })
    }
    const dbUser=await User.create(body);
    const id=dbUser._id;
    const acc=await Account.create({
        userId:id,
        balance:((1+Math.random()*10000)*100 )/100,
    })
    // const token=jwt.sign({
    //     userId: dbUser._id,
    //     username: dbUser.username,
    // },JWT_PASS );
    res.status(200).json({
        message: "user created successfully ",
        // token: token,
        // balance: acc.balance,

    })
});
const signinSchema=zod.object({
    username: zod.string(),
    password: zod.string(),
})
router.post('/signin/',async (req,res)=>{
    //console.log("in sign in");
    const body=req.body;
    //console.log(body);
    const parse=signinSchema.safeParse(body);
    //console.log(parse.success);
    if(!parse.success){
        return res.json({
            message: "invalid input format"
        })
    }
    // const authHeader=req.headers.authorization;
    // //console.log(token);
    // const token=authHeader.split(" ")[1];
    // const jwtVerify=jwt.verify(token,JWT_PASS);
    // if(!jwtVerify){
    //     return res.status(411).json({
    //         message: "usernot found/Error while logging in ",
    //         x: false
    //     })
    // }else{
    //     return res.json({
    //         msg:"user signed in",
    //         x:true
    //     })
    // }
    const user=await User.findOne({username: body.username}).exec();
    if(!user){
        return res.json({
            flag:false,
            message: "user not found",
        })
    }
    if(user.password!=body.password){
        return res.status(121).json({
            message: "incorrect password",
        })
    }
    const token=jwt.sign({
        userId: user._id,
        username: user.username,
    },JWT_PASS );
    res.json({
        message: "user signed in",
        flag: true,
        token:token
    })

});
const updateSchema=zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
})
router.put('/update',async (req,res)=>{
    const { success } =updateSchema.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg: "unformatted body",
        })
    }
    await User.updateOne(req.body,{
        id: req.userId
    })
    res.json({
        msg: "user details updated"
    })
});
router.get('/bulk',authmiddleware,async (req,res)=>{
    const filter=req.query.filter || "";
    //console.log(filter);
    const filteredUsers=await User.find({
        $or: [
            { firstname: { "$regex": filter, "$options": "i" } },
            { lastname: { "$regex": filter, "$options": "i" } }
        ]
    });
    res.json({
        user: filteredUsers.map(user =>({
            username:user.username,
            firstname:user.firstname,
            lastname: user.lastname,
            _id:user._id
        }))
    })
})


module.exports=router;