const router=require('express').Router();
const User=require('../models/user');
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken")


//Register
router.post('/register', async(req,res)=>{
    const newUser=new User({
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    });
    
    try{
    const saveuser= await newUser.save();
    res.status(201).json(saveuser);
    }
    catch(err){
        res.status(500).json(err)
    }
});


//login
router.post("/",async (req,res)=>
{
    try{
            const user=await User.findOne({email:req.body.email});
            !user && res.status(401).json("Wrong email or password !")
            
            //decryption of encrypted password
            const bytes=CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
            const originalPassword=bytes.toString(CryptoJS.enc.Utf8);
            //compare password
            originalPassword !== req.body.password && 
            res.status(401).json("Wrong password or username !");
        //create web token
        const accessToken=jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin
            },
              process.env.SECRET_KEY,
            { expiresIn:"30d" }
            );
            const {password,...info}=user._doc;//destructuring password 

            //send user
            res.status(200).json({...info,accessToken});
    }catch(err){
            res.status(500).json(err)
    }
})
module.exports=router;