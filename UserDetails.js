const mongoose=require("mongoose");
console.log("UserDetails");
const UserDetailSchema=new mongoose.Schema({
    "username":String,
    "email":String,
    "password":String ,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }]
},{
    collection:"UserInfo"
});
mongoose.model("UserInfo",UserDetailSchema)