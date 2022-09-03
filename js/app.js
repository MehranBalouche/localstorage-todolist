// start
let $ = document;
function _log(value) {
  console.log(value);
}
function _table(value) {
  console.table(value);
}

const inputElem = $.getElementById('itemInput');
const addButton = $.getElementById('addButton');
const clearButton = $.getElementById('clearButton');
const todoListElem = $.getElementById('todoList');

let todosArray = [];

function addNewTodo() {
  let newTodoTitle = inputElem.value;

  if (newTodoTitle.trim() === '') {
    alertEmptyInout.style.display = 'block';
    setTimeout(function () {
      alertEmptyInout.style.display = 'none';
    }, 3000);
    return;
  }

  const id = (Math.random() + 1).toString(36).substring(7);

  let newTodoObj = {
    id: id,
    title: newTodoTitle,
    complete: false,
  };

  inputElem.value = '';

  todosArray.push(newTodoObj);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);

  inputElem.focus();
}

function setLocalStorage(todosList) {
  localStorage.setItem('todos', JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;

  todoListElem.innerHTML = '';

  todosList.forEach(function (todo) {
    newTodoLiElem = $.createElement('li');
    newTodoLiElem.setAttribute('id', todo.id);
    newTodoLiElem.className = 'uncompleted well';

    newTodoLabalElem = $.createElement('label');
    newTodoLabalElem.innerHTML = todo.title;

    newTodoCompleteBtn = $.createElement('button');
    newTodoCompleteBtn.addEventListener('click', editTodo);
    newTodoCompleteBtn.className = 'btn btn-success';
    newTodoCompleteBtn.innerHTML = 'Complete';

    newTodoDeleteBtn = $.createElement('button');
    newTodoDeleteBtn.className = 'btn btn-danger';
    newTodoDeleteBtn.innerHTML = 'Delete';
    newTodoDeleteBtn.addEventListener('click', removeTodo);

    if (todo.complete) {
      newTodoLiElem.className = 'completed well';
      newTodoCompleteBtn.innerHTML = 'uncompleted';
    }

    newTodoLiElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );

    todoListElem.append(newTodoLiElem);
  });
}
// todoId
function editTodo(event) {
  let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
  todosArray = localStorageTodos;

  let targetId = event.target.parentElement.id;

  todosArray.forEach(function (todo) {
  if (todo.id === targetId) {
    todo.complete = !todo.complete;
  }
  });

  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function removeTodo(event) {
  let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

  todosArray = localStorageTodos;

  let targetId = event.target.parentElement.id;
  let mainTodoIndex = todosArray.findIndex(function (todo) {
    return todo.id === targetId;
  });
  todosArray.splice(mainTodoIndex, 1);

  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}

function clearTodos() {
  todosArray = [];
  todosGenerator(todosArray);
  // localStorage.clear()
  localStorage.removeItem('todos');
}

window.addEventListener('load', getLocalStorage);
addButton.addEventListener('click', addNewTodo);
clearButton.addEventListener('click', clearTodos);
inputElem.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    addNewTodo();
  }
});
