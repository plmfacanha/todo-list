import todoController from "../controllers/todoController.js";

const init = () => {
  const inboxDiv = document.querySelector(".inbox-div");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  addTodo.addEventListener("click", () => {
    showForm(inboxDiv, addTodo);
  });
};

const renderTodoList = (folder) => {
  const archive = todoController.fetchArchive();
  const inboxDiv = document.querySelector(".inbox-div");
  const completedDiv = document.querySelector(".completed-div");

  if (!folder || folder.trim() === "") return;

  inboxDiv.textContent = "";

  archive[folder].forEach((todo) => {
    const { label, icon, input } = renderTodo(inboxDiv, todo);

    input.addEventListener("change", function () {
      const isCompleted = toggleTodo(label, icon, input);

      if (isCompleted) {
        completedDiv.appendChild(label);
      } else {
        inboxDiv.appendChild(label);
      }
    });
  });
};

const toggleTodo = (label, icon, input) => {
  let isCompleted;

  if (input.checked) {
    label.classList.add("completed-task");
    icon.classList.add("fa-solid", "fa-circle-check");
    icon.classList.add("completed-icon");

    icon.classList.remove("fa-regular", "fa-circle");
    isCompleted = true;
  } else {
    label.classList.remove("completed-task");
    icon.classList.remove("fa-solid", "fa-circle-check");
    icon.classList.remove("completed-icon");

    icon.classList.add("fa-regular", "fa-circle");
    isCompleted = false;
  }
  return isCompleted;
};

const renderTodo = (container, todo) => {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const icon = document.createElement("i");

  const id = `task-${todo.getTitle()}`;

  icon.classList.add("fa-regular", "fa-circle");

  label.htmlFor = id;
  label.style.padding = "10px";
  label.style.position = "relative";

  input.id = id;
  input.type = "checkbox";
  input.style.position = "absolute";
  input.style.opacity = 0;

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.getTitle();

  label.append(icon, textSpan, input);
  container.appendChild(label);

  return { label, icon, input };
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
    renderTodoList("default");
    btn.style.display = "";
  });
};

export default { init };
