const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    profilepic:{type:String,default:""}
},
{timestamps:true}

);
module.exports=mongoose.model("user",userschema);