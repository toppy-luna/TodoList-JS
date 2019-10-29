const searchKeywordInput = document.querySelector('#search-keyword-input');

function checkboxListener(event) {
    const checkbox = event.currentTarget;
    const id = checkbox.dataset.id;

    const body = new FormData();
    body.append('done', checkbox.checked.toString());

    fetch(`./api/v1/item/${id}`, { method: 'PUT', body })
        .then(() => fetchTodoList());
}

function deleteButtonListener(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;

    fetch(`./api/v1/item/${id}`, { method: 'DELETE' })
        .then(() => fetchTodoList());
}

function renderTodoList(todoList) {
    const todoContainer = document.querySelector('#todo-container');

    const deleteButtonList = todoContainer.querySelectorAll('.delete-button');
    deleteButtonList.forEach((button) => button.removeEventListener('click', deleteButtonListener));
    const checkboxList = todoContainer.querySelectorAll('.checkbox');
    checkboxList.forEach((checkbox) => checkbox.removeEventListener('change', checkboxListener));

    todoContainer.innerHTML = '';

    for (const item of todoList) {
        console.log("item title:" + item.title);
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.dataset.id = item.id;
        checkbox.addEventListener('change', checkboxListener);
        const text = new Text(item.title);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.id = item.id;
        deleteButton.addEventListener('click', deleteButtonListener);

        label.appendChild(checkbox);
        label.appendChild(text);
        label.appendChild(deleteButton);

        li.appendChild(label);

        todoContainer.appendChild(li);
    }
}

async function postNewTodoItem(todoItem) {
    const body = new FormData();
    body.append('title', todoItem.title);

    return fetch('./api/v1/add', {
        method: 'POST',
        body
    }).then((response) => response.json());
}

const newTodoItemTitleInput = document.querySelector('#new-todo-item-title');
const newTodoAddButton = document.querySelector('#new-todo-item-add-button');

newTodoAddButton.addEventListener('click', (event) => {
    const title = newTodoItemTitleInput.value;

    if (title) {
        postNewTodoItem({ title }).then((item) => fetchTodoList());
    }
});

const searchKeywordButton = document.querySelector('#search-keyword-input-button');

searchKeywordButton.addEventListener('click', (event) => {
    fetchTodoList();
});

fetchTodoList();

async function fetchTodoList() {
    const keyword = searchKeywordInput.value;
    if (keyword) {
        return fetch(`./api/v1/list/${keyword}`)
            .then((response) => response.json())
            .then((todoList) => {
                renderTodoList(todoList);
            })
    } else {
        return fetch('./api/v1/list')
            .then((response) => response.json())
            .then((todoList) => {
                console.log("response size:" + todoList.length);
                renderTodoList(todoList);
            })
    }
}
