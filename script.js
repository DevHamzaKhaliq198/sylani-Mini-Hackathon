let users = [];
let todos = [];
let currentUser = null;

function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!email || !password) {
        Toastify({
            text: "Please fill All the input-fields",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#450108",
        }).showToast();
        return;
    }

    if (users.some(user => user.email === email)) {
        Toastify({
            text: "User already exists!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();
        return;
    }

    const user = {
        email: email,
        password: password,
        uid: Date.now(),
        status: 'created',
        createdAt: new Date()
    };

    users.push(user);
    Toastify({
        text: "Registration successful!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
    }).showToast();
    switchToLoginForm();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    currentUser = users.find(user => user.email === email && user.password === password);
    if (currentUser) {
        Toastify({
            text: "successfully logged In",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
        }).showToast();
        document.getElementById('userEmailDisplay').textContent = `Logged in as: ${currentUser.email}`;
        switchToTodoApp();
    } else {
        Toastify({
            text: "Enter correct E-mail or Password",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();
    }
}

function addTodo() {
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;
    const date = document.getElementById('todoDate').value;

    if (!title || !description || !date) {
        Toastify({
            text: "Please provide required data",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();
        return;
    }

    const todo = {
        title: title,
        description: description,
        date: date,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date(),
        user_id: currentUser.uid
    };

    todos.push(todo);
    Toastify({
        text: "To-Do successfully added ",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
    }).showToast();

    // Clear input fields after adding
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDescription').value = '';
    document.getElementById('todoDate').value = '';
}

function viewTodos() {
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    const userTodos = todos.filter(todo => todo.user_id === currentUser.uid);
    userTodos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = `(Title: ${todo.title}) -- (Description: ${todo.description})-- (Time: ${todo.date})`;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'todo-buttons';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Update';
        completeButton.onclick = () => completeTodo(todo.id);

        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(buttonsDiv);
        todoList.appendChild(li);
    });
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    renderTodos();
}

function completeTodo(todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        todo.status = 'completed';
    }
    renderTodos();
}

function switchToLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('todoApp').style.display = 'none';
}

function switchToTodoApp() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('todoApp').style.display = 'block';
}

// Initially display the registration form
document.getElementById('registerForm').style.display = 'block';
