let mail=document.querySelector(".mail");
let pass=document.querySelector(".pass");
let button=document.querySelector("button");
let p=document.querySelector("p")
async function getdata(){
    const res=await fetch("/edit");
    const userdata=await res.json();
    console.log(userdata);
    return userdata;
}
button.addEventListener("click",(event)=>{
    let u=getdata();
    for(d of u)
{
    if(d.email===mail.value)
    {
        if(d.password!=pass.value)
        {
            event.preventDefault();
            p.innerText="email or password is invalid";
        }
    }
}
});
