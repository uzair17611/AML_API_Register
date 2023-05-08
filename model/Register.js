const mongoose =require ('mongoose');
const validator =require('validator')


const user = new  mongoose.Schema({
      name:{
        type: String,
        required :true,
        trim:true
      },
      email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:{
            validator:(email)=>{
               return   validator.isEmail(email)
            },
            message: (props) =>{
                `${props.value} is not a valid email address`
            }
        }
      },
      password:{
        type:String,
        required:true,
        trim:true
      },
      contact:{
        type:String,
        required:true,
        unique:true,
        trim:true
      },
      type:{
        type:Number,
        required:true
      }

})

module.exports =mongoose.model('user' ,user)