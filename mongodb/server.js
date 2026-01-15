const exp=require("express");
const bodyParser = require('body-parser');
const app=exp();
const path=require("path");
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
mongoose.connect('mongodb://monogoipaddress/user');
  app.listen("port number", "IPV4", () => {
  console.log("Server running on http://IPV4:portnumber");
});

  let errr="";
  app.get("/",(req,res)=>{
    res.redirect("/login");
  });
  app.get("/login",(req,res)=>{
    res.render("login.ejs",{er:errr});
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
  res.redirect("/login");
    
  });
  let re,d;
  app.post("/login/request",(req,res)=>{
    let{email,password}=req.body;
    User.find({email:email}).then((data)=>{
        if(password===data[0].password)
        {
            errr="";
            res.redirect(`/home/${data[0].username}`);
        }
            else{
                errr="wrong email id or password";
                res.redirect(`/login`);
            }
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
    let {to}=req.params;
    let {username}=req.body;
    User.find({username:username}).then((users)=>{
      let chat1=new Chat(
    {
        from: username,
        to:to ,
        msg:"",
        created_at: new Date(),
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
        await Chat.find({$and: [
            {from:from},
            {to:to}
        ]}).then(async(data1)=>{
            data1.classlist="received";
            await Chat.find({$and: [
            {from:to},
            {to:from}
            ]}).then(async(data2)=>{
                data2.classlist="sent";
                data=await data1.concat(data2);
                await data.sort((a,b)=>a.created_at-b.created_at);
                await res.render("chat.ejs",{dat:data,fr:from,t:to});
            });
        });
  });
  app.post("/addchat",async(req,res)=>{
    let chat1=await new Chat(
    {
        from: t,
        to: f,
        msg: req.body.text,
        created_at: new Date(),
        classlist:"sent",
    }
  );
  await chat1.save();
  console.log(chat1.updated_at);
  });
  app.patch("/change",(req,res)=>{
    let text=req.body.text.trim();
    let msg=req.body.msg.trim();
    console.log(text,msg,f,t);
    Chat.findOneAndUpdate({msg:msg,from:t,to:f,},{msg:text,updated_at:new Date()}).then((data)=>{
        console.log(data);
    }).catch((err)=>{console.log(err);});
  });
  app.delete("/delete",(req,res)=>{
    let text=req.body.text.trim();
    console.log(text);
    Chat.findOneAndDelete({msg:text,from:t,to:f}).then((data)=>{
        console.log(data);
    }).catch((err)=>{console.log(err);});
  });