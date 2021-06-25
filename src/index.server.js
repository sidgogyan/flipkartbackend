const express=require("express");
const app=express();
const env=require('dotenv');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require("./routes/admin/auth")

//enviroment variable
env.config();

//mongodb connection
mongoose.connect("mongodb://localhost:27017/Rootcode",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log("database connected");

}).catch((e)=>{
    console.log("error");
})


//middleware
app.use(bodyParser.json());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);





//lisren server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})