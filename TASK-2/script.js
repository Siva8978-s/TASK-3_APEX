
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');


let tasks = [];

document.addEventListener('DOMContentLoaded', function() {
    
    taskForm.addEventListener('submit', addTask);
    
    contactForm.addEventListener('submit', handleContactForm);
});


function addTask(e) {
    e.preventDefault(); 
    
    const taskText = taskInput.value.trim();
    
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    
    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false
    };
    
    
    tasks.push(newTask);
    
    
    taskInput.value = '';
    
    
    displayTasks();
}

function displayTasks() {
    
    taskList.innerHTML = '';
    
   
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'task-item completed' : 'task-item';
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    
    displayTasks();
}

function deleteTask(id) {
    
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });
    
    displayTasks();
}



function handleContactForm(e) {
    e.preventDefault(); 
    
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    
    clearErrors();
    
    let isValid = true;
    
    
    if (name === '') {
        showError('name-error', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    
    if (email === '') {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Please enter a valid email');
        isValid = false;
    }
    
    
    if (message === '') {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    
    if (isValid) {
        
        successMessage.style.display = 'block';
        
        
        contactForm.reset();
        
       
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);
        
        console.log('Form submitted:', { name, email, message });
    }
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(function(element) {
        element.textContent = '';
    });
}

function isValidEmail(email) {
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}