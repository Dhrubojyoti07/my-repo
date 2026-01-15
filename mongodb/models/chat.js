const mongoose=require("mongoose");
const chatschema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
    },
    created_at:{
        type:Date,
        required:true,
    },
    updated_at:{
        type:Date,
    },
    classlist:{
        type:String,
    },
});
const Chat=mongoose.model("Chat",chatschema);
module.exports=Chat;