const express=require(`express`);
const path=require(`path`);
const port=6969;
const app=express();
const mo=require("method-override");
const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'agency',
  password: 'dhrubo@2007'
});
let rnduser=()=>{
     let u=[
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password()
    ];

 return u;
}

// let user=[];
// for(let i=0;i<10;i++){
// user.push(rnduser());
// }
// console.log(user.length);

// try{
//     connection.query(
//     `INSERT INTO user(userId,username,email,password) VALUES ?`,
//      [user],
//      (err,result)=>{
//         if(err)
//             throw err;
//         console.log(result);
//      }
// );
// }
// catch(err){
//     console.log(err);
// }
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(mo("_method"));
app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log(`app is listerning on port ${port}`);
});
app.get("/home",(req,res)=>{
    try{
        connection.query(
            `SELECT * FROM user`,
            (err,users)=>{
                if(err) throw err;
                res.render("home.ejs",{data:users});
            }

        );
    }
    catch(err){
        console.log(err);
    }
});
app.get("/new",(req,res)=>{
     try{
        connection.query(
            `SELECT * FROM user`,
            (err,users)=>{
                if(err) throw err;
                res.render("new.ejs",{data:users});
            }

        );
    }
    catch(err){
        console.log(err);
    }
});
app.post("/home",(req,res)=>{
    let {username,email,password}=req.body;
     try{
        connection.query(
            `INSERT INTO user(userId,username,email,password) VALUES (?,?,?,?)`,
             [faker.string.uuid(),
             username,
             email,
             password],
            (err,users)=>{
                if(err) throw err;
                res.redirect("/home");
            }

        );
    }
    catch(err){
        console.log(err);
    }
    
});
app.get("/edit",(req,res)=>{
    try{
        connection.query(
            `SELECT * FROM user`,
            (err,users)=>{
                if(err) throw err;
                res.render("editcheck.ejs",{data:users});
            }
        );
    }
    catch(err){
        console.log(err);
    }
});
app.post("/edit/verified",(req,res)=>{
    let {email,password}=req.body;
    try{
        connection.query(
            `SELECT * FROM user WHERE email='${email}'`,
            (err,users)=>{
                if(err) throw err;
                let us=users[0];
                if(password==us.password){
                    console.log(us.password);
                res.render("edit.ejs",{data:us});
                }
                else
                {
                    res.send("wrong email or password");
                }
            }
        );
    }
    catch(err){
        console.log(err);
    }
});
app.patch("/home/:userID",(req,res)=>{
    let userID=req.params.userID;
    try{
        connection.query(
            `SELECT * FROM user WHERE userID='${userID}'`,
            (err,users)=>{
                if(err) throw err;
                let {username,email,password}=req.body;
                try{
                connection.query(`UPDATE user SET username='${username}',email='${email}',password='${password}' WHERE userID='${userID}'`,
                    (err,users)=>{
                        if(err) throw err;
                        res.redirect("/home");
                    });
            }
            catch(err){
                console.log(err);
            }
        }
        );
        }
    catch(err){
        console.log(err);
    }
});
app.get("/delete",(req,res)=>{
    try{
        connection.query(
            `SELECT * FROM user`,
            (err,users)=>{
                if(err) throw err;
                res.render("delete.ejs",{data:users});
            }
        );
    }
    catch(err){
        console.log(err);
    }
});
app.delete("/deleteuser",(req,res)=>{
    let {email,password}=req.body;
   try{
    connection.query(`SELECT * FROM user WHERE email='${email}'`,(err,users)=>{
        let u=users[0];
        if(password==u.password){
        connection.query(
            `DELETE FROM user WHERE email='${email}'`,
            (err,users)=>{
                if(err) throw err;
                res.redirect("/home");
            }
        );
      }
      else{
        res.send("invalid email or password ,unable to remove user.")
      }
    }
    );
}
    catch(err){
        console.log(err);
    } 
})