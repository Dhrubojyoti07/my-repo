let sent=document.querySelector("button");
let chats=document.querySelector(".chats");
let inp=document.querySelector("input");
sent.addEventListener("click",(event)=>{
    let d=document.createElement("div");
    d.classList.add("sent");
    d.innerHTML=inp.value;
    console.log(inp.value);
    chats.appendChild(d);
    try {
         fetch('/addchat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inp.value })
        });
      } catch (err) {
        console.error('Error saving to DB:', err);
      }
      location.reload();
});



