require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const bodyParser=require('body-parser');
const cors=require('cors');
const port = process.env.port || 5000;
const router=require('./router/user');
const app=express();
mongoose.connect(process.env.MONGOURL,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected',()=>{
    console.log('conected to db');
})
const corsOptions={
    "origin": 'http://localhost:3000',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  }
app.use(cors(corsOptions));
const SESSION_NAME='sid';
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use(session({
    name:SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    secret:'JRZ5LUIaTbBaHXWp',
    cookie:{
        maxAge:60*60*1000*10,
        sameSite:false,
        httpOnly:true
    }
}));

app.use('/',router);

app.listen(port, () => console.log(`Listening on port ${port}`)); 
