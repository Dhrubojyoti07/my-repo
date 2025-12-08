button=document.querySelector("button");
inp=document.querySelector("input");
ul=document.querySelector("ul");
button.addEventListener("click",function(){
    let list=document.createElement("li");
    list.innerText=inp.value;
    let bt=document.createElement("button");
    bt.classList.add("bts");
    bt.innerHTML='<i class="fa-solid fa-trash"></i>';
    list.appendChild(bt);
    ul.appendChild(list);
    inp.value="";
});
ul.addEventListener("click",function(event){
    if(event.target.nodeName=="BUTTON"){
        let del = event.target.parentElement;
        console.dir(del);
        del.remove();
}});

    
        