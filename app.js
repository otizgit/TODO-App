const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const check = document.querySelector(".check");
const checkImg = document.querySelector(".check-img");
const trackSpan = document.querySelector(".track span");
const filterOptions = document.querySelector(".filter-todo");
const clearCompleted = document.querySelector(".clear");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
// const clearAll = document.querySelector(".clear-all");
const toggleMode = document.querySelector(".toggle-mode");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const heroImg = document.querySelector(".hero-img img");
const darkImg = document.querySelector(".dark-img");
const lightImg = document.querySelector(".light-img");
const root = document.querySelector(":root");
const html = document.querySelector("html");

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteTodo);

filterOptions.addEventListener("click", filterTodo);

// clearAll.addEventListener("click", clearTodos);

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() !== "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = '<img src="./images/icon-cross.svg" alt="icon-cross">';
    trashBtn.classList.add("trash");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
  } else {
    alert("Please enter a task.");
  }

  todoInput.value = "";
}

function deleteTodo(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    //ANIMATION
    removeLocalTodos(todo);

    todo.addEventListener("animationend", (e) => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed-todo");
    item.classList.toggle("checked");
  }
}

// function clearTodos(e) {
//   const clearBtn = e.target;
//   const todos = clearBtn.parentElement.previousElementSibling.children;
//   for (i = 0; i < todos.length; i++) {
//     todos[i].style.display = "none";
//     todos[i].remove();
//   }
// }

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.classList.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "active":
        if (!todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "completed":
        if (todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
          clearCompleted.addEventListener("click", function () {
            todo.classList.add("fall");
            todo.addEventListener("transitionend", (e) => {
              todo.remove();
            });
          });
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

filterOptions.addEventListener("click", function (e) {
  if (e.target === all) {
    all.style.color = "#2de674";
    active.style.color = "#777a92";
    completed.style.color = "#777a92";
  } else if (e.target === active) {
    active.style.color = "#2de674";
    all.style.color = "#777a92";
    completed.style.color = "#777a92";
  } else if (e.target === completed) {
    completed.style.color = "#2de674";
    active.style.color = "#777a92";
    all.style.color = "#777a92";
  }
});

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveDarkMode(mode) {
  mode = JSON.parse(localStorage.getItem("mode"));
  localStorage.setItem("mode", JSON.stringify(mode));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = '<img src="./images/icon-cross.svg" alt="icon-cross">';
    trashBtn.classList.add("trash");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


if (localStorage.getItem("darkMode") === null) {
  localStorage.setItem("darkMode", "true");
}

checkStatus();

function checkStatus() {
  if (localStorage.getItem("darkMode") === "true") {
    changeToDark();
  } else {
    changeToLight();
  }
}

function changeToLight() {
  localStorage.setItem("darkMode", "false");
  moon.classList.add("display-moon");
  sun.classList.add("slide-sun");
  darkImg.classList.add("hide-img");
  lightImg.classList.add("show-img");
  root.style.setProperty("--VeryDarkBlue", "hsl(0, 0%, 98%)");
  root.style.setProperty("--VeryDarkDesaturatedBlue", "hsl(0, 0%, 98%)");
  root.style.setProperty("--LightGrayishBlue", "hsl(235, 24%, 19%)");
  root.style.setProperty("--VeryLightGrayishBlue", "hsl(235, 19%, 35%)");
  root.style.setProperty("--VeryDarkGrayishBlue", "hsl(236, 9%, 61%)");
  root.style.setProperty("--darkshadow", "#585656bd");
  html.classList.remove("firefox-dark");
  html.classList.remove("chromium-dark");
}

function changeToDark() {
  localStorage.setItem("darkMode", "true");
  moon.classList.remove("display-moon");
  sun.classList.remove("slide-sun");
  darkImg.classList.remove("hide-img");
  lightImg.classList.remove("show-img");
  root.style.removeProperty("--VeryDarkBlue", "hsl(0, 0%, 98%)");
  root.style.removeProperty("--VeryDarkDesaturatedBlue", "hsl(0, 0%, 98%)");
  root.style.removeProperty("--LightGrayishBlue", "hsl(235, 24%, 19%)");
  root.style.removeProperty("--VeryLightGrayishBlue", "hsl(235, 19%, 35%)");
  root.style.removeProperty("--VeryDarkGrayishBlue", "hsl(236, 9%, 61%)");
  root.style.removeProperty("--darkshadow", "#585656bd");
  html.classList.add("firefox-dark");
  html.classList.add("chromium-dark");
}

sun.addEventListener("click", changeToLight);

moon.addEventListener("click", changeToDark);
