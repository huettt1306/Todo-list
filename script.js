function saveData() {
    let subjects = [];
    document.querySelectorAll('.subject-container').forEach(subject => {
        let subjectText = subject.querySelector('.task-container strong').innerText;
        let tasks = [];
        subject.querySelectorAll('.taskList li').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-container').innerText,
                completed: task.classList.contains('completed')
            });
        });
        subjects.push({ subject: subjectText, tasks });
    });

    localStorage.setItem('subjects', JSON.stringify(subjects));
}

function loadData() {
    let subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    subjects.forEach(data => {
        let subjectLi = document.createElement('li');
        subjectLi.classList.add('subject-container');
        subjectLi.innerHTML = `
            <button class="delete" onclick="removeSubject(this)">X</button>
            <button class="complete" onclick="completeTask(this)">✔</button>
            <div class="task-container"><strong>${data.subject}</strong></div>
            <ul class="taskList"></ul>
            <input type='text' placeholder='Add a task' class='taskInput'>
            <button onclick='addTask(this)'>Add Task</button>
        `;
        document.getElementById('subjectList').appendChild(subjectLi);

        let taskList = subjectLi.querySelector('.taskList');
        data.tasks.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = `
                <button class="delete" onclick="removeTask(this)">X</button>
                <button class="complete" onclick="completeTask(this)">✔</button>
                <div class="task-container">${task.text}</div>
            `;
            if (task.completed) li.classList.add('completed');
            taskList.appendChild(li);
        });
    });
}

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

    saveData(); // Lưu dữ liệu sau khi thêm môn học
}

function removeSubject(button) {
    button.parentElement.remove();
    saveData(); // Lưu dữ liệu sau khi xóa môn học
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

    saveData(); // Lưu dữ liệu sau khi thêm nhiệm vụ
}

function removeTask(button) {
    button.parentElement.remove();
    saveData(); // Lưu dữ liệu sau khi xóa nhiệm vụ
}

function completeTask(button) {
    button.parentElement.classList.toggle('completed');
    saveData(); // Lưu trạng thái sau khi hoàn thành nhiệm vụ
}

// Tải dữ liệu từ localStorage khi trang được tải
window.onload = loadData;
