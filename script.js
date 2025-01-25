function addSubject() {
    let subjectInput = document.getElementById('subject');
    let subjectText = subjectInput.value.trim();
    if (subjectText === '') return;

    let subjectLi = document.createElement('li');
    subjectLi.classList.add('subject-container');
    subjectLi.innerHTML = `
        <button class="delete" onclick="removeSubject(this)">X</button>
        <button class="complete" onclick="completeTask(this)">✔</button>
        <div class="task-container"><strong>${subjectText}</strong></div>
        <ul class="taskList"></ul>
        <input type='text' placeholder='Add a task' class='taskInput'>
        <button onclick='addTask(this)'>Add Task</button>
    `;
    document.getElementById('subjectList').appendChild(subjectLi);
    subjectInput.value = '';
}

function removeSubject(button) {
    button.parentElement.remove();
}

function addTask(button) {
    let taskInput = button.previousElementSibling;
    let taskText = taskInput.value.trim();
    if (taskText === '') return;

    let li = document.createElement('li');
    li.innerHTML = `
        <button class="delete" onclick="removeTask(this)">X</button>
        <button class="complete" onclick="completeTask(this)">✔</button>
        <div class="task-container">${taskText}</div>
    `;
    button.parentElement.querySelector('.taskList').appendChild(li);
    taskInput.value = '';
}

function removeTask(button) {
    button.parentElement.remove();
}

function completeTask(button) {
    button.parentElement.classList.toggle('completed');
}
