// Check if the user is already logged in
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
});

// Login Functionality
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true'); // Store login state
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert('Invalid credentials!');
    }
});

// Logout Functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
});

// Navigation to sections
const buttons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('section');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.target;
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(target).style.display = 'block';
    });
});

// Task Saving, Completion, and Deletion
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const deletedTaskList = document.getElementById('deleted-task-list');
const toggleDeletedTasksButton = document.getElementById('toggle-deleted-tasks');
let deletedTasksVisible = false;

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <div>
            <h3>${taskName}</h3>
            <p>Due: ${taskDate}</p>
        </div>
        <div>
            <button class="complete-btn">Mark as Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);

    taskItem.querySelector('.complete-btn').addEventListener('click', () => {
        taskItem.style.textDecoration = 'line-through';
        taskItem.style.background = '#28a745';
        taskItem.querySelector('.complete-btn').style.display = 'none';
    });

    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        // Move task to deleted tasks list
        taskItem.style.display = 'none'; // Hide task from task list
        const deletedTask = taskItem.cloneNode(true);
        deletedTask.querySelector('.delete-btn').style.display = 'none'; // Hide delete button
        deletedTaskList.appendChild(deletedTask);
    });

    taskForm.reset();
});

// Toggle deleted tasks visibility
toggleDeletedTasksButton.addEventListener('click', () => {
    deletedTasksVisible = !deletedTasksVisible;
    document.getElementById('deleted-tasks').style.display = deletedTasksVisible ? 'block' : 'none';
});
