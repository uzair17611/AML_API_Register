const express =require('express');
const app =express();
const mongoose =require('mongoose')
const user_Routes =require("./routes/RegisterRoutes")
const bodyparser=require('body-parser');
require("dotenv").config()
const mongooseURl=process.env.MONGO_URL

mongoose.connect(mongooseURl);
app.use(bodyparser.urlencoded({extended:true}))
app.use('/api' ,user_Routes);




app.listen(4000 ,()=>{
     console.log('server is listning on port 4000')
})