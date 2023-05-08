const express =require('express');
const validate =require('../middleware/Validate')
const bodyparser =require('body-parser')

const user_Routes=express();

user_Routes.use(bodyparser.json());
user_Routes.use(bodyparser.urlencoded({extended:true}));
 
const  user_controller =require('../controller/userRegister')



user_Routes.post('/Register' ,user_controller.register_user );
user_Routes.post('/login' ,user_controller.user_login)
user_Routes.get('/test', validate, (req, res) => {
 return   res.status(200).send({
      success: true,
      message: "authenticated"
    });
  });


module.exports=user_Routes;


