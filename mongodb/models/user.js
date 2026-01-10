const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:[8,"password must be atleast 8 digit"],
    },
});
const User=mongoose.model("User",userschema);
module.exports=User;