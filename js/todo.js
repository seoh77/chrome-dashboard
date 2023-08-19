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

function paintCheck(checkTodo) {
  const all_li = document.querySelectorAll(".todo-item");
  let li;

  for (let i = 0; i < all_li.length; i++) {
    if (parseInt(all_li[i].id) === checkTodo.id) {
      li = all_li[i];
    }
  }

  const checkbox = li.children[0];
  const checktodo = li.children[1];

  if (checkTodo.checked === 1) {
    checkbox.innerText = "✔️";
    checktodo.classList.add(CHECKED_CLASS);
  } else if (checkTodo.checked === 0) {
    checkbox.innerText = "";
    checktodo.classList.remove(CHECKED_CLASS);
  }
}

function checkTodoSave(event) {
  const li = event.target.parentElement;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(li.id)) {
      todos[i].checked = todos[i].checked === 1 ? 0 : 1;
      saveTodos();
      paintCheck(todos[i]);
    }
  }
}

function paintTodos(newTodo) {
  const todoItemElem = document.createElement("li");
  todoItemElem.classList.add("todo-item");
  todoItemElem.id = newTodo.id;

  const checkboxElem = document.createElement("button");
  checkboxElem.classList.add("checkbox");
  checkboxElem.addEventListener("click", checkTodoSave);

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
    checked: 0,
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
  parsedTodos.forEach(paintCheck);
}

todoBtn.addEventListener("click", todoBtnClick);
