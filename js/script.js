var add_tasks_div = document.querySelector(".add_tasks");
var btn_add_task = document.getElementById("btn_add_task");
var task_title_input = document.getElementById("title_task");
var task_description_input = document.getElementById("task");
var task_complement_input = document.getElementById("complement_task");
var btn_clear_tasks = document.getElementById("btn_clear_tasks");
var btn_add_image = document.getElementById("btn_add_image");
var add_image = document.getElementById("add_image");
var input_search = document.getElementById("input_search");
var text_list_indentification = document.getElementById("text_list_indentification") 

const list_div = document.getElementById("list_tasks");
const task_details_div = document.getElementById("task_details_div");
const task_title_display = document.getElementById("task_title");
const task_description_display = document.getElementById("task_description");
const task_complement_display = document.getElementById("task_complement");

let tasks = [];
let currentTaskIndex = null;
let counter = 0;


btn_add_image.addEventListener('click', function () {
    counter = counter + 1;

    if (counter == 1) {
        add_tasks_div.style.display = 'block';
        btn_add_image.style.transform = 'rotate(90deg)';
    } else if (counter == 2) {
        counter = 0;
        add_tasks_div.style.display = 'none';
        btn_add_image.style.transform = 'rotate(0)';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
});

btn_add_task.addEventListener('click', function () {
    var taskTitle = task_title_input.value;
    var taskDescription = task_description_input.value;
    var taskComplement = task_complement_input.value;

    if (taskTitle.trim() !== '') {
        var newTask = {
            title: taskTitle,
            description: taskDescription,
            complement: taskComplement,
            situation: ''
        };

        tasks.push(newTask);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        updateTaskList();

        task_title_input.value = '';
        task_description_input.value = '   Descrição da tarefa..';
        task_complement_input.value = '   Complemento da tarefa..';
    } else {
        alert('O título da tarefa não pode estar vazio.');
    }
});

function updateTaskList(filteredTasks = tasks) {
    list_div.innerHTML = '';

    filteredTasks.forEach(function (task, index) {
        const taskItem = document.createElement('div');
        const taskTitle = document.createElement('li');
        taskTitle.textContent = task.title;
        taskTitle.classList.add('task-title');
        taskItem.appendChild(taskTitle);
        list_div.appendChild(taskItem);

        taskTitle.addEventListener('click', function () {
            if (currentTaskIndex === index) {
                // Hide the task details
                task_details_div.style.display = 'none';
                currentTaskIndex = null;
            } else {
                // Show the task details
                task_title_display.textContent = task.title;
                task_description_display.textContent = task.description;
                task_complement_display.textContent = task.complement;
                task_details_div.style.display = 'block';
                currentTaskIndex = index;
            }
        });
    });

    if (filteredTasks.length >= 1) {
        btn_clear_tasks.style.display = 'block';
    } else {
        btn_clear_tasks.style.display = 'none';
    }
}

btn_clear_tasks.addEventListener('click', function () {
    localStorage.clear();
    tasks = [];
    updateTaskList();
});

input_search.addEventListener('input', function () {
    const query = input_search.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
    );
    updateTaskList(filteredTasks);
});
