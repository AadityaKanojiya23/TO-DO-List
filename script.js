document.addEventListener('DOMContentLoaded', () =>{
    
const input = document.getElementById('todo-input')
const todobtn = document.getElementById('todo-btn')
const list = document.getElementById('todo-list')


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTask(task))

todobtn.addEventListener('click', () => {
   
    const tasktrim = input.value.trim()
    if (tasktrim==="") return; 
   
    const newtask = {
        id : Date.now(),
        text : tasktrim ,
        complete : false,
    };

    tasks.push(newtask);
    saveTask();
    renderTask(newtask)
    input.value = "";
    console.log(tasks);
});

function renderTask(task){
   const li = document.createElement('li')
   li.setAttribute('data-id', task.id)
   if (task.complete) li.classList.add("completed") 
   li.innerHTML = `
   <span>${task.text}</span>
   <button>Delete</button>
   `;
   li.addEventListener('click', (e) =>{
    if(e.target.tagName === 'BUTTON') return;
    task.complete = !task.complete
    li.classList.toggle("completed")
    saveTask();
   })

   li.querySelector('button').addEventListener('click' , (e)=> {
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTask();
   })

   list.appendChild(li)
}


function saveTask(){
    localStorage.setItem("tasks" , JSON.stringify(tasks))  
}
})
