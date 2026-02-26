import todoController from "../controllers/todoController.js";

const init = () => {
  const inboxDiv = document.querySelector(".custom-div");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  addTodo.addEventListener("click", () => {
    showForm(inboxDiv, addTodo);
  });
};

const updateInbox = (folder) => {
  const archive = todoController.fetchArchive();
  const inbox = document.querySelector(".inbox");
  inbox.textContent = "";

  if (!folder || folder.trim() === "") return;

  archive[folder].forEach((task) => {
    const li = document.createElement("li");
    const icon = document.createElement("i");
    const span = document.createElement("span");

    icon.classList.add("fa-regular", "fa-circle");
    span.textContent = task.getTitle();
    li.append(icon, span);

    inbox.appendChild(li);
  });
};

const showForm = (container, btn) => {
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

    todoController.addTodo(task);
    form.remove();
    updateInbox("default");
  });
};

export default { init };
