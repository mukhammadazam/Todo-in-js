const form = document.getElementById("form");
const input = document.getElementById("input");
const message = document.getElementById("message");
const list = document.getElementById("list");
let todo = JSON.parse(localStorage.getItem("text"))
  ? JSON.parse(localStorage.getItem("text"))
  : [];
console.log(todo);

if (todo.length) getFunc();

// time function
function nowTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const hour =
    now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes();
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}
nowTime();

// Data placement localstorage
function todoFunc() {
  localStorage.setItem("text", JSON.stringify(todo));
}

// Get from localStorage
function getFunc() {
  const todo = JSON.parse(localStorage.getItem("text"));
  list.innerHTML = "";
  todo.forEach((el, index) => {
    list.innerHTML += `
         <li ondblclick=(completed(${index})) class="list-group-item d-flex justify-content-between w-50 mx-auto ${el.completed==true ? "completed" : ""}">
          ${el.title}
          <div class="todo">
            <span class="opacity-50 me-2">${el.time}</span>
            <img onclick=(chance=(${index})) class="text-primary cursor-point"  src="./image/edit.svg" alt="editButton" width="25" height="25" />
            <img onclick=(deleteFunction(${index}))  class="text-primary cursor-point" src="./image/trash.svg" alt="deleteButton" width="25" height="25" />
          </div>
        </li>`;
  });
}
// Always to use
function newFunc(text, error) {
  document.getElementById(`${text}`).textContent = error;
  setTimeout(() => {
    document.getElementById(`${text}`).textContent = "";
  }, 2000);
}

// addEventListener to connect
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = form["input"].value.trim();
  form.reset();
  todoFunc();
  if (value.length) {
    todo.unshift({
      title: value,
      time: nowTime(),
      completed: false,
    });
    getFunc();
    todoFunc();
    // console.log(todo);
  } else {
    newFunc("message", "Please, fill out ...");
  }
});

// delete function

function deleteFunction(i) {
  const deleteFilter = todo.filter((el, index) => {
    return i !== index;
  });
  todo = deleteFilter;
  getFunc();
  todoFunc();
  //   console.log(todo)
}

// Completed

function completed(i) {
  const filterMap = todo.map((el, index) => {
    if (i == index) {
      return { ...el, completed: el.completed == true ? false : true };
    } else {
      return { ...el };
    }
  });
  todo = filterMap;
  getFunc();
  todoFunc();
}
