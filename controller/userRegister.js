const mongoose =require('mongoose');
const user =require('../model/Register.js')
const bcryptjs =require('bcrypt');
const express =require('express');
const config =require("../config/config.js")
const jwt =require("jsonwebtoken")
const validate =require('../middleware/Validate.js')


const createToken = async (id) => {
    const token = await jwt.sign({ _id: id }, config.jwt_secretkey, { expiresIn: "90d" });
    return token;
  };
const securepassword =  (password)=>{
        
          const encryptedPassword=   bcryptjs.hash(password,10)
          return encryptedPassword
}

const register_user =async (req,res)=>{
    const  SPassword = await securepassword(req.body.password)
try {
  const Newuser =  user({
    name:req.body.name,
    email:req.body.email,
    password: SPassword,
    contact:req.body.contact,
    type:req.body.type

   })

   const userdata =await  user.findOne({email:req.body.email });
   if(userdata){
   
    res.status(200).send({success:false , msg:'this email or phone number already exist already exist'})
   }else{
    const user_data =await Newuser.save();
    res.status(200).send({success:true , data:user_data})
   
   }

} catch (error) {
    res.status(200).send(error.message)
   
}
}

const user_login =async (req,res)=>{

        const email =req.body.email;
      
        const password = req.body.password;
    //   console.log(password);
      
        const userData =await user.findOne({email: email});
        // console.log(userData.password)
        // console.log(userData)


        if(userData){
            const  PasswordMatch =await  bcryptjs.compare(password,userData.password)
            console.log(password)
            console.log(userData.password)
         console.log(PasswordMatch)
          if( PasswordMatch){
            const tokenData = await createToken(userData._id)
            res.cookie("acces-token", tokenData,{
                maxAage:60*60*24*30*100
            })
                const userResult={
                    _id :userData._id,
                    name:userData.name,
                    password :userData.password,
                    contact:userData.contact,
                    type:userData.type,
                    token:tokenData
                }
             
                const response ={
                    success :true,
                    msg:"user Detail",
                    Data:userResult
                }
                res.status(200).send(response);
            } else{
                res.status(200).send({success:true, msg:"Login details  incorrect"})
            }
       
          }
          
          else{
            res.status(200).send({
                success:true,
                msg:'login detail are incorrect'
            })
          }
        }
        
        
       


module.exports={register_user,user_login}