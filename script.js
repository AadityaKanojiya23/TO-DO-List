document.addEventListener('DOMContentLoaded', () =>{
    // Select DOM Element
const input = document.getElementById('todo-input')
const todobtn = document.getElementById('todo-btn')
const list = document.getElementById('todo-list')

// ek array jaha per task store hoga 

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTask(task)) // isse kyahoga like page refresh hone ke baad dom ke local storage se inpute data render main store hoga one by one 

//ab task kaise add hoga wo after click 

todobtn.addEventListener('click', () => {
    // agar user ne inpute ke time space add kiya toh usko kaise hataye ?

    const tasktrim = input.value.trim() // trim faltu ke space ko trim kar denga 

    if (tasktrim==="") return; // agar user ne kuch inpute nhi likha hai or button per click kar raa ahai toh kuch nhi perform hoga 

    // after writting any inpute
    const newtask = {
        id : Date.now() /*unique id*/ ,
        text : tasktrim /*inpute ka task store*/ ,
        complete : false,
    };

    tasks.push(newtask);
    saveTask();
    renderTask(newtask)
    input.value = "";//clear inpute
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
    localStorage.setItem("tasks" , JSON.stringify(tasks))  // isse ab data ya inpute localhost main bhi save hoga console ke saat jisse refresh ke baad nhi inpute wahi rahenga 
    // setItem main key "string" + value bhi string hona chahye per we have task as array isliye JSON.stringify use kiya 
}
})