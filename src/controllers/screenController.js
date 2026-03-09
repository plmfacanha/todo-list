import todoController from "../controllers/todoController.js";
import { format, differenceInCalendarDays } from "date-fns";

const init = () => {
  const dialog = document.querySelector("dialog");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  addTodo.addEventListener("click", () => {
    createForm(dialog);
    dialog.showModal();
  });

  renderTodoList("default");
};

const renderTodoList = (folder) => {
  const archive = todoController.loadStorage();
  const inboxDiv = document.querySelector(".inbox-div");
  const completedDiv = document.querySelector(".completed-div");

  if (!folder || folder.trim() === "") return;

  inboxDiv.textContent = "";
  completedDiv.textContent = "";

  archive[folder].forEach((todo) => {
    const { label, icon, input, deadline } = renderTodo(inboxDiv, todo);
    const dueDate = deadline.textContent;

    let currentStatus = todo.getChecklist();
    if (currentStatus) {
      completedDiv.appendChild(label);
      deadline.textContent = "Done!";
    } else {
      inboxDiv.appendChild(label);
    }
    checkTodo(label, icon, currentStatus);

    input.addEventListener("change", () => {
      let updatedStatus = input.checked;
      if (updatedStatus) todo.setChecklist(!status);
      todoController.updateStorage(todo);
      renderTodoList("default");
    });
  });
};

const createForm = (container) => {
  container.textContent = "";

  const form = document.createElement("form");
  const taskLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const taskInput = document.createElement("input");
  const dueDateInput = document.createElement("input");

  const inputDiv = document.createElement("div");

  const confirmBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  confirmBtn.type = "submit";
  confirmBtn.classList.add("confirm-btn");
  cancelBtn.classList.add("cancel-btn");

  taskLabel.htmlFor = "task";
  taskLabel.textContent = "Task: ";
  dueDateLabel.htmlFor = "due-date";
  dueDateLabel.textContent = "Due Date: ";

  taskInput.id = "task";
  taskInput.type = "text";
  dueDateInput.id = "due-date";
  dueDateInput.type = "date";

  inputDiv.append(taskLabel, taskInput, dueDateLabel, dueDateInput);
  inputDiv.classList.add("input-div");

  confirmBtn.textContent = "Confirm";
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";

  form.append(inputDiv, confirmBtn, cancelBtn);
  container.appendChild(form);

  cancelBtn.addEventListener("click", function () {
    form.remove();
    container.close();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (!task) {
      alert("Task cannot be empty!");
      return;
    }

    const dueDate = dueDateInput.value;
    if (!dueDate) {
      alert("Please pick a due date!");
      return;
    }

    const currentDate = format(new Date(), "yyyy-MM-dd");
    if (dueDate < currentDate) {
      alert("Please pick a date greater than today!");
      return;
    }

    todoController.addTodo(task.trim(), dueDate);
    renderTodoList("default");
    form.remove();
    container.close();
  });
};

const renderTodo = (container, todo) => {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const icon = document.createElement("i");
  const titleSpan = document.createElement("span");
  const deadline = document.createElement("span");

  const id = `task-${todo.getTitle()}`;

  icon.classList.add("fa-regular", "fa-circle");

  label.htmlFor = id;
  label.classList.add("list-label");

  input.id = id;
  input.type = "checkbox";
  input.style.position = "absolute";
  input.style.opacity = 0;

  titleSpan.textContent = todo.getTitle();

  const daysRemaining = differenceInCalendarDays(todo.getDueDate(), new Date());
  deadline.textContent = `This task is due in: ${daysRemaining} days`;
  deadline.classList.add("deadline-span");

  label.append(icon, titleSpan, input, deadline);
  container.appendChild(label);

  return { label, icon, input, deadline };
};

const checkTodo = (label, icon, status) => {
  if (status) {
    label.classList.add("completed-task");
    icon.classList.add("fa-solid", "fa-circle-check", "completed-icon");
    icon.classList.remove("fa-regular", "fa-circle");
    return;
  }

  label.classList.remove("completed-task");
  icon.classList.remove("fa-solid", "fa-circle-check", "completed-icon");
  icon.classList.add("fa-regular", "fa-circle");
};

export default { init };
