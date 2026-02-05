import Todo from "../models/Todo.js";
import Project from "../models/Project.js";
import todoController from "../controllers/todoController.js";

const addForm = document.querySelector(".addForm");
const addBtn = document.querySelector(".addBtn");

addBtn.addEventListener("click", function () {
  const dialog = document.createElement("dialog");
  const p = document.createElement("p");
  p.textContent = `Would you like to add this todo to a project?`;
  dialog.appendChild(p);

  addForm.setAttribute("method", "dialog");
  addForm.appendChild(dialog);

  dialog.showModal();
});
