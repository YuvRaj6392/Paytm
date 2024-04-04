const express = require("express");
const app=express();
const cors=require("cors")
const bodyParser=require('body-parser')
const {PORT}=require('./configuration/config')
const db=require('./models/index');
const rootRouter=require('./routes/index')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose.connect(db.url).then(()=>{
 console.log('successfully connected to the database')
}).catch(()=>{
 console.log('failed to connect to the database')
})

app.use('/api/v1',rootRouter);

//Global catch
app.use((err,req,res,next)=>{
 res.status(400).json({
  msg:'Invalid input'
 })
})

app.listen(PORT,()=>{
 console.log('server is listening at port '+PORT)
})


