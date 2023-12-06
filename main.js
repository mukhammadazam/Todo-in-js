const form = document.getElementById("form");
const input = document.getElementById("input");
const message = document.getElementById("message");
const list = document.getElementById("list");
let todo = JSON.parse(localStorage.getItem("title"))
  ? JSON.parse(localStorage.getItem("text"))
  : [];
//   console.log(todo)


// Data placement localstorage
function todoFunc() {
  localStorage.setItem("text", JSON.stringify(todo));
}

// Get from localStorage
function getFunc(){
    const todo =JSON.parse(localStorage.getItem("text"))
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
      time: "347",
      copleted: false,
    });
    console.log(todo);
  } else {
    newFunc("message", "Please, fill out ...");
  }
});
