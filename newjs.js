// selectors 
const todo_input=document.querySelector(".todo-input")
const create_todo_btn = document.querySelector(".todo-button")
const ul_todo_container = document.querySelector(".todo-list")
const todo_box = document.querySelector(".todo-container")
const delete_all_btn = document.querySelector(".delete-all")

// addEventListener 
create_todo_btn.addEventListener("click",createTodo)
delete_all_btn.addEventListener("click",deleteAll)


// function
let todos = JSON.parse(localStorage.getItem("todo")) || [];

// console.log(todos)

function createTodo(e){
    e.preventDefault();
    if(todo_input.value == ""){
        console.log("empty")
        return
    }
    const todo_obj={
        title:todo_input.value,
        id:Date.now().toString()
    }
    // console.log(todo_obj)

    todos.push(todo_obj)

    renderTodo(todo_obj.title,todo_obj.id);
    // console.log(todos)
    
    localStorage.setItem("todo",JSON.stringify(todos))

} 

function renderTodo(title,id){
    const li = document.createElement('li')
    li.classList.add('todo-items')
    li.textContent=title;
    li.id=id;

    todo_box.appendChild(li)

    // console.log(todo_box)
 
    
    const delete_btn=document.createElement('button')
    delete_btn.classList.add('del-btn')
    delete_btn.textContent="DELETE";
    delete_btn.id=id;

    delete_btn.addEventListener("click",()=>{
        deleteLi(id,li)
        // console.log(id,li)
    })
    // console.log(delete_btn)

    li.appendChild(delete_btn)
    
    todo_input.value = "";
}

todos.forEach(({title,id}) => {
    renderTodo(title,id)
});


function deleteLi(todoid,li){
    li.remove();

    todos=todos.filter(({id})=>{
        // console.log(todoid,id)
        return id != todoid
    })
    localStorage.setItem("todo",JSON.stringify(todos))
}


// delete all btn 

function deleteAll(e){
    todo_box.remove();
    todos=[];
    localStorage.removeItem("todo");
}