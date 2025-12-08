let st=false;
let max=0;
let c=0;
let rar=[],uar=[];
let rc=["yellow","green","blue","red"];
let level=0;
let game=document.querySelector(".game");
let h=document.querySelector("h3");
let hh=document.querySelector("h2");
let hhh=document.querySelector("h1");
let main=document.querySelector(".main");
document.addEventListener("keypress",function()
{
    if(st==false)
    {
        st=true;
        levelup();
    }
});
  function levelup()
{
    level++;
    h.innerHTML=`level ${level}`;
    let colour=rndcolor();
    setTimeout(blink(`.${colour}`),1000);
    rar[level-1]=colour;
}

 function rndcolor(){
    let num=Math.floor(Math.random()*4);
     let colour=rc[num];
    return colour;
}
function blink(btns){
     let bt=document.querySelector(btns);
    bt.classList.add("white");
    setTimeout(function(){
        bt.classList.remove("white");
},250);
}
function userbtn(){
    let car=this.getAttribute("class").split(" ");
    let colo=car[0];
    uar.push(colo);
    blink(`.${colo}`);
     checkin(uar.length-1);

}
let btn=document.querySelectorAll(".btn");
for(b of btn)
{
    b.addEventListener("click",userbtn);
}
function checkin(i){
        if(rar[i]==uar[i]){
             if(rar.length==uar.length){
                setTimeout(levelup,1000);
                uar=[];
            }
        }
            else{
                st=false;
                if(max<level){
                    max=level;
                }
                hh.innerHTML= `Highest Score = ${max}`;
                h.innerHTML=`Game over!Your score is ${level} <br> Press any key to continue game `;
                level=0;
                rar=[];
                uar=[];
            }
    }   
   /* function changecolour(c,d,t){
        return new Promise((resolve,reject)=>{
            resolve(setInterval(()=>{
                hhh.style.color=c;
                h.style.fontSize=`${t}px`;
            },d));
        });
    }
    changecolour(rc[3],1000,20)
    .then(()=>{
        return changecolour(rc[1],3000,22);
        
    })
    .then(()=>{
        return changecolour(rc[2],5000,24);
    })
    .then(()=>{
        return changecolour(rc[0],7000),26;
    });
    */
    
    


    


