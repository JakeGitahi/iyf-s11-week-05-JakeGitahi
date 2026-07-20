// DOM Elements

const form=document.getElementById("todo-form");

const input=document.getElementById("todo-input");

const todoList=document.getElementById("todo-list");

const itemsLeft=document.getElementById("items-left");

const filters=document.querySelectorAll(".filter");

const clearCompleted=document.getElementById("clear-completed");

// State

let todos=[];

let currentFilter="all";

// Create Todo Element

function createTodoElement(todo){

    const li=document.createElement("li");

    li.className="todo";

    if(todo.completed){

        li.classList.add("completed");

    }

    li.dataset.id=todo.id;

    const span=document.createElement("span");

    span.textContent=todo.text;

    const deleteButton=document.createElement("button");

    deleteButton.textContent="Delete";

    deleteButton.className="delete";

    li.appendChild(span);

    li.appendChild(deleteButton);

    return li;

}

// Render Todos

function renderTodos(){

    todoList.innerHTML="";

    let filtered=todos;

    if(currentFilter==="active"){

        filtered=todos.filter(todo=>!todo.completed);

    }

    if(currentFilter==="completed"){

        filtered=todos.filter(todo=>todo.completed);

    }

    filtered.forEach(todo=>{

        todoList.appendChild(createTodoElement(todo));

    });

    updateStats();

}

// Add Todo

function addTodo(text){

    const todo={

        id:Date.now(),

        text:text,

        completed:false

    };

    todos.push(todo);

    renderTodos();

}

// Toggle Todo

function toggleTodo(id){

    todos=todos.map(todo=>{

        if(todo.id===id){

            todo.completed=!todo.completed;

        }

        return todo;

    });

    renderTodos();

}

// Delete Todo

function deleteTodo(id){

    todos=todos.filter(todo=>todo.id!==id);

    renderTodos();

}

// Update Stats

function updateStats(){

    const remaining=todos.filter(todo=>!todo.completed).length;

    itemsLeft.textContent=`${remaining} items left`;

}

// Filter

function filterTodos(filter){

    currentFilter=filter;

    filters.forEach(button=>{

        button.classList.remove("active");

    });

    document
        .querySelector(`[data-filter="${filter}"]`)
        .classList
        .add("active");

    renderTodos();

}

// Add Task

form.addEventListener("submit",function(event){

    event.preventDefault();

    const text=input.value.trim();

    if(text===""){

        return;

    }

    addTodo(text);

    input.value="";

});

// Toggle/Delete

todoList.addEventListener("click",function(event){

    const li=event.target.closest(".todo");

    if(!li){

        return;

    }

    const id=Number(li.dataset.id);

    if(event.target.classList.contains("delete")){

        deleteTodo(id);

    }

    else{

        toggleTodo(id);

    }

});

// Filters

filters.forEach(button=>{

    button.addEventListener("click",function(){

        filterTodos(button.dataset.filter);

    });

});

// Clear Completed

clearCompleted.addEventListener("click",function(){

    todos=todos.filter(todo=>!todo.completed);

    renderTodos();

});

// Bonus Editing

todoList.addEventListener("dblclick",function(event){

    if(event.target.tagName==="SPAN"){

        const li=event.target.parentElement;

        const id=Number(li.dataset.id);

        const updated=prompt("Edit task",event.target.textContent);

        if(updated!==null && updated.trim()!==""){

            todos=todos.map(todo=>{

                if(todo.id===id){

                    todo.text=updated;

                }

                return todo;

            });

            renderTodos();

        }

    }

});

// Initialize

renderTodos();