const User=require('../models/user');
const jwt=require("jsonwebtoken");
const {validationResult} =require("express-validator");

exports.signup=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(user){
            return res.status(400).json({message:"User already exits"});
        }
         
        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const _user=new User({
            firstName,
            lastName,
            email,
            password,
            username:Math.random().toString()
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:"some thing went wrong"
                })
            }

            if(data){
                return res.status(201).json({
                    message:"User created sucessfully"
                })
            }
        })
    })
}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
      if(error || !user){
          return res.status(400).json({message:"user not registerd please sign up"});
      }
      if(user){
         if(user.authenticate(req.body.password)){
             const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'6d'});
             const {email,role,fullName,firstName,lastName,_id}=user;
             res.status(200).json({
                 token,
                 user:{
                    email,
                    role,
                    fullName,
                    firstName,
                    lastName,
                    _id
                 }
             })

            }
             else{
               return res.status(400).json({message:"Wrong credintals"});
            }   
      }
      else{
        res.status(400).json({message:"Something went worng"});
      }
    })
}

