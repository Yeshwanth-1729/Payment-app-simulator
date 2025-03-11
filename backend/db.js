const mongoose=require("mongoose");

mongoose.connect("<Your mongodb url>");

const userScheme=mongoose.Schema({
    firstname: String,
    lastname: String,
    username:String,
    password:String
});
const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance:{
        type:mongoose.Schema.Types.Number,
        required: true
    }
})
const User=mongoose.model('User',userScheme);
const Account=mongoose.model('Account',accountSchema);
module.exports={
    User,
    Account
};