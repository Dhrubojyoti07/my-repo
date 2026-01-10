let crebtn=document.querySelector(".crebtn");
let epass=document.querySelector(".epass");
let cpass=document.querySelector(".cpass");
let form=document.querySelector("form");
let error=document.querySelector(".error");
crebtn.addEventListener("click",(event)=>{
    if(epass.value!=cpass.value){
        error.innerText="Re-entered password doesnot match with created password";
        event.preventDefault();
    }
    
})