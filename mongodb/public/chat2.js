let sent=document.querySelector("#sent");
let chats=document.querySelector(".chats");
let inp=document.querySelector("#msg");
let edit=document.querySelector("#edit");
let eddit=document.querySelector("#eddit");
const chatBox = document.querySelectorAll(".box");
    const menu = document.getElementById("customMenu");
    const editBtn = document.getElementById("editBtn");
    const deleteBtn = document.getElementById("deleteBtn");
 let coc=document.querySelector("#editchat");
 let bb=document.querySelector("#bdy");
 let dd=document.querySelector("#deletechat");
 let dc=document.querySelector("#delete");
 let cc=document.querySelector("#cancel");
 let chit;   
sent.addEventListener("click",(event)=>{
  console.log("button was clicked");
    let d=document.createElement("div");
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
inp.addEventListener("keydown",(event)=>{
  console.log(event.key);
  if(event.key=="Enter"){  console.log("button was clicked");
    let d=document.createElement("div");
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
    }
});
    // Show custom menu on right-click
    chatBox.forEach(box => {
  box.addEventListener("contextmenu", (event) => {
    chit=event.target.closest(".box").firstChild.textContent;
    event.preventDefault();
    menu.style.display = "block";
    menu.style.top = event.pageY + "px";
    menu.style.left = event.pageX + "px";
  });
});


    // Hide menu when clicking elsewhere
    document.addEventListener("click", function() {
      menu.style.display = "none";
    });

    // Button actions
    editBtn.addEventListener("click", function(event) {
      coc.setAttribute("id", "z");
      bb.classList.add("blur");
      eddit.value=chit;
    });
    edit.addEventListener("click",(event)=>{
        bb.classList.remove("blur");
        coc.setAttribute("id","editchat");
        console.log(eddit.value);
        try {
         fetch('/change', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text:eddit.value ,msg:chit}),
        });
        location.reload();
      } catch (err) {
        console.error('Error saving to DB:', err);
      }
    });
      deleteBtn.addEventListener("click", function() {
        dd.setAttribute("id", "y");
        bb.classList.add("blur");
    });
    cc.addEventListener("click", function() {
        dd.setAttribute("id", "deletechat");
        bb.classList.remove("blur");
    });
    dc.addEventListener("click", function() {
        dd.setAttribute("id", "deletechat");
        bb.classList.remove("blur");
        try {
         fetch('/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text:chit}),
        });
        location.reload();
      } catch (err) {
        console.error('Error saving to DB:', err);
      }
    });

