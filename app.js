const express =require('express');//we have multiple functions here
const mongoose = require('mongoose');
const app=express();
const dotenv=require("dotenv");
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const migrationRoute=require('./routes/Migration');
const linkRoute=require('./routes/LinkCr');

const cors=require("cors");



dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(()=>console.log("Db connection successfull")).catch((err)=>console.log(err));

app.use(cors())
app.use(express.json());
// //Middleware
// const  middleware=(req,res,next)=>{
//     console.log('hi middleware')
// }


// app.get('/',(req,res)=>{
//     res.send('hello world')
// });
// app.get('/profile',middleware,(req,res)=>{
//     res.send('about world')
// });

app.use('/server/auth',authRoute);//if u make any req take this endpoint , endpoint belong to authroute which send authetication req

app.use('/server/users',userRoute);
app.use('/server/migration',migrationRoute);
app.use('/server/links',linkRoute);


app.listen(3000,()=>{
    console.log('backend server is running at port no 3000')
})