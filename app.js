const express = require("express");
const mongoose = require('mongoose');
const bcrypt=require("bcrypt");
const app = express();
app.use(express.json()); 
mongoose.connect('mongodb://127.0.0.1:27017/jraba3_project')
        .then(() => console.log("mongodb connected"))
        .catch((error) => { throw new Error(error) });


require("./UserDetails")
const User=mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({ status: "Started" })
})


app.post("/register",async(req,resp)=>{
    console.log("comming from frontend ",req.body)
    const {username,email,password}=req.body;

    const oldUser=await User.findOne({email:email});
    console.log("from db : ",oldUser);
    if(oldUser){
      return   resp.send({data:"User already exist"});
    }
    const encryptedPassword=await bcrypt.hash(password,10);
    try {
        await User.create({
            username:username,
            email:email,
            password:encryptedPassword
        })
        resp.send({"status":"ok",data:"User created"})
    } catch (error) {
        resp.send({"status":"error",data:error})
    }
})

app.post("/login",async(req,resp)=>{
    console.log("comming from frontend ",req.body)
    const {username,email,password,mobile}=req.body;
    const user=await User.findOne({email:email});
    console.log("from db : ",User);
    if(user){
        const encryptedPassword=await bcrypt.hash(password,10);
        const passwordMatches = await bcrypt.compare(password, user.password);
        if(passwordMatches){
         resp.send({data:"Connection succesfully","user":user});
        }else {
            resp.send({data:"Connection failed","error":"password incorrect"});
        }
    }else{
        return resp.send({data:"Connection failed","error":"user non existant"})
    }
   
});


app.post("/addFriend", async (req, res) => {
    try {
        const {userConnected,emailFriend}=req.body;
        const user = await User.findOne({ email: userConnected.email});
        

        // Add the friend to the user's friends array
        const friend = await User.findOne({ email: emailFriend});
        if (friend) {
            user.friends.push(friend._id);
            await user.save();
            return res.status(200).json({ message: "Friend added successfully" });
        } else {
            return res.status(404).json({ message: "Friend not found with email ${emailFriend}" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(5001, () => {
    console.log("node js server started");
    })
