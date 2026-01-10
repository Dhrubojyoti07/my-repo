const exp=require("express");
const bodyParser = require('body-parser');
const app=exp();
const path=require("path");
const port=6969;
const mongoose=require("mongoose");
const mo=require("method-override");
const Chat=require("./models/chat.js");
const User=require("./models/user.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(exp.static(path.join(__dirname,"/public")));
app.use(mo("_method"));
app.use(exp.urlencoded({extended:true}));
app.use(bodyParser.json());
const con2=mongoose.createConnection('mongodb://127.0.0.1:27017/user');
mongoose.connect('mongodb://127.0.0.1:27017/user');
  app.listen(port,()=>{
    console.log("server is listerning on port 6969");
  });
  function date(){
    let istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    istTime=istTime.trim().substring(10,16).concat(istTime.trim().substring(19));
    return istTime;
  }
  app.get("/login",(req,res)=>{
    res.render("login.ejs");
  });
  app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
  });
  app.post("/createnew",(req,res)=>{
        let{username,email,password}=req.body;
        let user1=new User(
    {
        username:username,
        email:email,
        password:password,
    }
  );
  user1.save();
  res.redirect("/login")
    
  });
  let re,d;
  app.post("/login/request",(req,res)=>{
    let{email,password}=req.body;
    User.find({email:email}).then((data)=>{
        if(password===data[0].password)
        {
            res.redirect(`/home/${data[0].username}`);
    }
            else
            res.send("wrong email or password");
            });
        }
  );
  app.get("/home/:from",(req,res)=>{
    let {from}=req.params;
    User.find({username:from}).then((users)=>{
      re=users[0].username;
    Chat.find({to:from}).then((chats)=>{
            const uc = [...new Map(chats.map(item => [item.from, item])).values()];
            res.render("home.ejs",{dat:users[0],chat:uc});
            });
            }).catch(()=>{res.send("no user found")});

  });

  app.get("/add/new/:user",(req,res)=>{
    let {user}=req.params;
    res.render("newchat.ejs",{user});
  });
  app.post("/add/:to",(req,res)=>{
    console.log(re);
    let {to}=req.params;
    let {username}=req.body;
    User.find({username:username}).then((users)=>{
      console.log(users);
      let datee=date();
      console.log(datee);
      let chat1=new Chat(
    {
        from: username,
        to:to ,
        msg:"",
        created_at: datee,
    }
  );
  chat1.save();
  res.redirect(`/home/${to}`);
  });
});
  let f,t,data=[];
  app.get("/chats/:from/:to",async (req,res)=>{
        let {from,to}=await req.params;
        f=from;
        t=to;
        Chat.find({$and: [
            {from:from},
            {to:to}
        ]}).then((data1)=>{
            data1.classlist="received";
            Chat.find({$and: [
            {from:to},
            {to:from}
            ]}).then((data2)=>{
                data2.classlist="sent";
                data=data1.concat(data2);
                data.sort((a,b)=>a.created_at-b.created_at);
                console.log(data);
                res.render("chat.ejs",{dat:data,fr:from,t:to});
            })
        });
  });
  app.post("/addchat",async(req,res)=>{
    console.log(req.body.text);
    console.log(f,t);
    let datee=date();
      console.log(datee);
    let chat1=await new Chat(
    {
        from: t,
        to: f,
        msg: req.body.text,
        created_at: datee,
        classlist:"sent",
    }
  );
  await chat1.save();

  });
//   let chat1=new Chat(
//     {
//         from: 'kiit',
//         to: 'dhrubo',
//         msg: 'tomorrow you have a class',
//         created_at: new Date(),
//     }
//   );
//   chat1.save();
