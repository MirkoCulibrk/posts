const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const port = process.env.port || 5000;
const app=express();
// store for users
const SESSION_NAME='sid';
const users=[
    {id:1,name:'mirko',email:'micoculibrk@gmail.com',password:'secret'},
    {id:2,name:'alex',email:'micoculibrk@gmail.com',password:'secret'},
    {id:3,name:'jelena',email:'micoculibrk@gmail.com',password:'secret'}
]
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(session({
    name:SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    secret:'JRZ5LUIaTbBaHXWp',
    cookie:{
        maxAge:60*60*1000,
        sameSite:true,
    }
}));
const redirectLogin=(req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login');
    }else{
        next();
    }
}
const redirectHome=(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/home');
    }else{
        next();
    }
}
app.get('/',(req,res)=>{
    let {userId}=req.session;
    res.send(`
        <h1>welcome</h1>
        ${userId?
            ` <a href="/home">Home</a>
            <form method="post" action="/logout">
                <button>Logout</button>
            </form>`
            :
            `<a href="/login">Login</a>
             <a href="/register">Register</a>
            `  
        }
       
        
    `)
});
app.use((req,res,next)=>{
    const {userId}=req.session;
    if(userId){
        res.locals.user=users.find((user)=>user.id===req.session.userId);
    }
    next();
})
app.get('/home',redirectLogin,(req,res)=>{
    const {user}=res.locals;
    console.log(req.session);
    res.send(
        `<h1>welcome</h1>
        <a href="/">Main</a>
        <ul>
            <li>name:${user.name}</li>
            <li>email:${user.email}</li>
        </ul>
        `
    )
})
app.get('/login',redirectHome,(req,res)=>{
    // req.session.userId=
    res.send(`
        <h1>Login</h1>
        <form method="post" action="/login">
            <input type="email" name="email" placeholder="email" required/>
            <input type="password" name="password" placeholder="password" required/>
            <input type="submit"/>
        </form>
    `)
})
app.get('/register',redirectHome,(req,res)=>{
    res.send(`
    <h1>Register</h1>
    <form method="post" action="/login">
    <input type="text" name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit"/>
    </form>
`)
})
app.post('/login',redirectHome,(req,res)=>{
    const {email,password}=req.body;
    if(email && password){
        const user=users.find(user=>user.email===email && user.password===password);
        if(user){
            // setujemo trenutni user id u session na sam user.id iz stora
            req.session.userId=user.id;
            return res.redirect('/home');
        }
    }
    res.redirect('/login');
})
app.post('/register',redirectHome,(req,res)=>{
    const {name,email,password}=req.body;
    if(name && email && password){
        const exists=user.some(user=>user.email===email);
        if(!exists){
            const user={
                id:users.length+1,
                name,
                email,
                password
            };
            user.push(user);
            req.session.userId=user.id;
            return res.redirect('/login');
        }
    }
    res.redirect('/register');
})
app.post('/logout',redirectLogin,(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/home');
        }
    });
    res.clearCookie(SESSION_NAME);
    res.redirect('/login');
});
app.listen(port,()=>{
    console.log(`runngin on ${port}`);
})