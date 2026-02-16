import Todo from "../models/Todo.js";
import Project from "../models/Folder.js";
import todoController from "../controllers/todoController.js";

const inbox = document.querySelector(".inbox");
const projects = document.querySelector(".projects");

const div = document.querySelector(".addForm");
const addTodo = document.querySelector(".addTodo");
const addProject = document.querySelector(".addProject");

const displayTodos = (folderName) => {
  const folder = todoController.fetchFolder(folderName);

  folder.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;

    inbox.appendChild(li);
  });
};
displayTodos("Inbox");
