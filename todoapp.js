button=document.querySelector("button");
inp=document.querySelector("input");
ul=document.querySelector("ul");
button.addEventListener("click",function(){
    let list=document.createElement("li");
    list.innerText=inp.value;
    let bt=document.createElement("button");
    bt.classList.add("bts");
    bt.innerHTML='del';
    
    list.appendChild(bt);
    ul.appendChild(list);
    inp.value="";
    bt.addEventListener("click",function(event){
    console.dir(event.target.parentElement);
    event.target.parentElement.remove();
});

});
