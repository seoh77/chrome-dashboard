const todoBtn = document.querySelector(".todo-btn");
const todoBox = document.querySelector(".todo-list-box");

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

const HIDDEN_CLASS = "hidden";
const CHECKED_CLASS = "checked";
const TODOS_KEY = "todos";

let todos = [];

function todoBtnClick() {
  if (todoBox.classList.contains(HIDDEN_CLASS)) {
    todoBox.classList.remove(HIDDEN_CLASS);
  } else {
    todoBox.classList.add(HIDDEN_CLASS);
  }
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function checkTodos(event) {
  const li = event.target.parentElement;
  const checkedDiv = li.children[1];

  if (checkedDiv.classList.contains(CHECKED_CLASS)) {
    li.children[0].innerText = "";
    checkedDiv.classList.remove(CHECKED_CLASS);
  } else {
    li.children[0].innerText = "✔️";
    checkedDiv.classList.add(CHECKED_CLASS);
  }
}

function paintTodos(newTodo) {
  const todoItemElem = document.createElement("li");
  todoItemElem.classList.add("todo-item");
  todoItemElem.id = newTodo.id;

  const checkboxElem = document.createElement("button");
  checkboxElem.classList.add("checkbox");
  checkboxElem.addEventListener("click", checkTodos);

  const todoElem = document.createElement("div");
  todoElem.classList.add("todo");
  todoElem.innerText = newTodo.text;

  const delBtnElem = document.createElement("button");
  delBtnElem.classList.add("delBtn");
  delBtnElem.innerHTML = "X";
  delBtnElem.addEventListener("click", deleteTodo);

  todoItemElem.appendChild(checkboxElem);
  todoItemElem.appendChild(todoElem);
  todoItemElem.appendChild(delBtnElem);

  todoList.appendChild(todoItemElem);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodos(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodos);
}

todoBtn.addEventListener("click", todoBtnClick);
