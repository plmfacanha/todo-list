import todoController from "../controllers/todoController.js";

const init = () => {
  const container = document.querySelector("#wrapper");
  const customDiv = container.querySelector(".custom-div");
  const addTodo = container.querySelector(".custom-btn.add-todo");

  const inbox = document.querySelector(".inbox");
  const projects = document.querySelector(".projects");

  displayFolder(inbox);

  addTodo.addEventListener("click", () => {
    showForm(customDiv, inbox, addTodo);
  });
};

const displayFolder = (folder) => {
  const archive = todoController.fetchArchive();
};

const showForm = (container, inbox, btn) => {
  btn.style.display = "none";

  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");

  const confirmBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  confirmBtn.classList.add("confirm-btn");
  cancelBtn.classList.add("cancel-btn");

  label.textContent = "Task: ";
  input.type = "text";
  confirmBtn.textContent = "Confirm";
  cancelBtn.textContent = "Cancel";

  form.append(label, input, confirmBtn, cancelBtn);
  container.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = input.value;

    const li = document.createElement("li");
    const icon = document.createElement("i");
    const span = document.createElement("span");

    icon.classList.add("fa-regular", "fa-circle");
    span.textContent = task;
    li.append(icon, span);

    todoController.addTodo(task);
    form.remove();
    inbox.appendChild(li);
  });
};

export default { init };
