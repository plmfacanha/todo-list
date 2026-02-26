import todoController from "../controllers/todoController.js";

const init = () => {
  const inboxDiv = document.querySelector(".inbox-div");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  addTodo.addEventListener("click", () => {
    showForm(inboxDiv, addTodo);
  });
};

const updateInbox = (folder) => {
  const archive = todoController.fetchArchive();

  if (!folder || folder.trim() === "") return;

  archive[folder].forEach((task) => {
    displayTask(task);
  });
};

const displayTask = (task) => {
  const inboxDiv = document.querySelector(".inbox");
  const completedDiv = document.querySelector(".completed-div");

  inboxDiv.textContent = "";

  const li = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const icon = document.createElement("i");

  const id = `task-${task.getTitle()}`;

  icon.classList.add("fa-regular", "fa-circle");

  label.htmlFor = id;
  label.style.marginLeft = "10px";

  input.id = id;
  input.type = "checkbox";
  input.style.position = "absolute";
  input.style.opacity = 0;

  const textSpan = document.createElement("span");
  textSpan.textContent = task.getTitle();

  label.append(icon, textSpan, input);

  li.style.padding = "10px";
  li.appendChild(label);

  inboxDiv.appendChild(label);

  input.addEventListener("change", () => {
    if (input.checked) {
      label.classList.add("completed-task");
      icon.classList.remove("fa-regular", "fa-circle");
      icon.classList.add("fa-solid", "fa-circle-check");
      icon.classList.add("completed-icon");

      completedDiv.appendChild(label);
    } else {
      label.classList.remove("completed-task");
      icon.classList.remove("fa-solid", "fa-circle-check");
      icon.classList.add("fa-regular", "fa-circle");
      icon.classList.remove("completed-icon");

      inboxDiv.appendChild(label);
    }
  });

  return li;
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
    btn.style.display = "";
  });
};

export default { init };
