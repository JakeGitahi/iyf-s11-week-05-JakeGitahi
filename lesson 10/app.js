// ======================================
// TASK 10.1
// Event Listeners
// ======================================

const increase=document.getElementById("increase");
const decrease=document.getElementById("decrease");
const reset=document.getElementById("reset");

const countDisplay=document.getElementById("count");

let count=0;

increase.addEventListener("click",function(){

    count++;

    countDisplay.textContent=count;

});

decrease.addEventListener("click",function(){

    if(count>0){

        count--;

    }

    countDisplay.textContent=count;

});

reset.addEventListener("click",function(){

    count=0;

    countDisplay.textContent=count;

});

// ======================================
// Basic Event Listener
// ======================================

const button=document.createElement("button");

button.textContent="Click Me";

document.body.appendChild(button);

button.addEventListener("click",function(){

    console.log("Button clicked");

});

button.addEventListener("click",()=>{

    console.log("Clicked again");

});

function handleClick(){

    console.log("Handled");

}

button.addEventListener("click",handleClick);

button.removeEventListener("click",handleClick);

// ======================================
// Mouse Events
// ======================================

button.addEventListener("mouseenter",function(){

    console.log("Mouse entered");

});

button.addEventListener("mouseleave",function(){

    console.log("Mouse left");

});

// ======================================
// Keyboard Events
// ======================================

document.addEventListener("keydown",function(event){

    console.log(event.key);

    console.log(event.code);

});

// ======================================
// TASK 10.2
// Event Object
// ======================================

document.addEventListener("click",function(event){

    console.log(event.target);

    console.log(event.currentTarget);

    console.log(event.type);

    console.log(event.clientX);

    console.log(event.clientY);

});

document.addEventListener("keydown",function(event){

    if(event.ctrlKey && event.key==="s"){

        event.preventDefault();

        alert("Saved!");

    }

    if(event.key==="Escape"){

        document.getElementById("name").value="";

        document.getElementById("email").value="";

    }

    if(event.ctrlKey && event.key==="Enter"){

        document.getElementById("contact-form").requestSubmit();

    }

});

// ======================================
// TASK 10.3
// Event Bubbling
// ======================================

const parent=document.createElement("div");

parent.id="parent";

parent.style.padding="30px";

parent.style.background="lightblue";

document.body.appendChild(parent);

const child=document.createElement("div");

child.id="child";

child.style.padding="30px";

child.style.background="orange";

child.textContent="Click Me";

parent.appendChild(child);

parent.addEventListener("click",function(){

    console.log("Parent clicked");

});

child.addEventListener("click",function(){

    console.log("Child clicked");

});

// ======================================
// Event Delegation
// ======================================

const ul=document.createElement("ul");

document.body.appendChild(ul);

["Apple","Banana","Orange"].forEach(function(item){

    const li=document.createElement("li");

    li.textContent=item;

    ul.appendChild(li);

});

ul.addEventListener("click",function(event){

    if(event.target.matches("li")){

        event.target.classList.toggle("selected");

        console.log(event.target.textContent);

    }

});

// ======================================
// TASK 10.4
// Form Validation
// ======================================

const form=document.getElementById("contact-form");

const nameInput=document.getElementById("name");

const emailInput=document.getElementById("email");

const message=document.getElementById("message");

nameInput.addEventListener("input",function(){

    if(nameInput.value.length<2){

        nameInput.classList.add("error");

    }

    else{

        nameInput.classList.remove("error");

    }

});

emailInput.addEventListener("input",function(){

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(emailInput.value)){

        emailInput.classList.remove("error");

    }

    else{

        emailInput.classList.add("error");

    }

});

form.addEventListener("submit",function(event){

    event.preventDefault();

    if(

        nameInput.value.length>=2 &&

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)

    ){

        message.textContent="Form Submitted Successfully";

        message.className="success";

        form.reset();

    }

});