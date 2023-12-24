//creat new todo
const input = document.querySelector(".input");
const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".drop-down");


let filterValue = "all";

form.addEventListener("submit", addtodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  creatTodos(todos);
});

function addtodo(e) {
  e.preventDefault();


  if (!input.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: input.value,
    isCompleted: false,
  };

  saveTodo(newTodo);
  filterTodos();
}

//global function------------------------------------
function creatTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `
      <li class="todo-li">
      <p class="task ${todo.isCompleted && "completed"}">${todo.title}</p>
      <span class="date"> ${new Date(todo.createdAt).toLocaleDateString(
        "en-IR"
      )}</span>
      <button  class="todo___remove" data-todo-id=${todo.id}>
      <i class="fa fa-times" aria-hidden="true"></i></button>
      <button class="check" data-todo-id=${todo.id}>
      <i class="fa fa-check-circle" aria-hidden="true"></i></button>
      </li>`;
  });
  todoList.innerHTML = result;
  input.value = "";

  const removeBtn = [...document.querySelectorAll(".todo___remove")];
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", removeTodo);
  });

  const checkBtn = [...document.querySelectorAll(".check")];
  checkBtn.forEach((btn) => {
    btn.addEventListener("click", checkTodo);
  });
}

function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      creatTodos(todos);
      break;
    }
    case "completed": {
      const filterSelect = todos.filter((t) => t.isCompleted);
      creatTodos(filterSelect);
      break;
    }
    case "uncompeleted": {
      const filterSelect = todos.filter((t) => !t.isCompleted);
      creatTodos(filterSelect);
      break;
    }
    default:
      creatTodos(todos);
  }
}

function removeTodo(event) {
  let todos = getAllTodos();
  const todoId = Number(event.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodo(todos);
  filterTodos();

  //todo--check-------------------
}

function checkTodo(event) {
  let todos = getAllTodos();
  const todoId = Number(event.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodo(todos);
  filterTodos();

}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodo(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
