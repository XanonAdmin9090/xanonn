// Your Firebase configuration object (replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAY_fQ8WeVtBwA7orhfs75W6HP_V_IFczI",
    authDomain: "auth-76681.firebaseapp.com",
    projectId: "auth-76681",
    storageBucket: "auth-76681.firebasestorage.app",
    messagingSenderId: "306642804365",
    appId: "1:306642804365:web:7a87601f30792cb58bccc4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Check if the user is already logged in
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
});

// Login Functionality
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } catch (error) {
        document.getElementById('error-message').textContent = `Login failed: ${error.message}`;
        document.getElementById('error-message').style.display = 'block';  // Show the error message
    }
});

// Logout Functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('isLoggedIn');
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('main-content').style.display = 'none';
    }).catch((error) => {
        console.error('Logout error: ', error.message);
    });
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
