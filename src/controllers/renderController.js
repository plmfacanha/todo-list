import { differenceInCalendarDays } from "date-fns";

const renderDiv = (container, className) => {
  const div = document.createElement(container);
  div.classList.add(className);

  return div;
};

const renderForm = (dialog) => {
  dialog.textContent = "";

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
  cancelBtn.type = "button";
  cancelBtn.classList.add("cancel-btn");

  taskLabel.htmlFor = "task";
  taskLabel.textContent = "Task: ";
  dueDateLabel.htmlFor = "due-date";
  dueDateLabel.textContent = "Due Date: ";

  taskInput.id = "task";
  taskInput.type = "text";
  dueDateInput.id = "due-date";
  dueDateInput.type = "date";

  inputDiv.classList.add("input-div");
  inputDiv.append(taskLabel, taskInput, dueDateLabel, dueDateInput);

  confirmBtn.textContent = "Confirm";
  cancelBtn.textContent = "Cancel";

  form.append(inputDiv, confirmBtn, cancelBtn);
  dialog.appendChild(form);

  return { form, taskInput, dueDateInput, cancelBtn };
};

const renderTodo = (todo) => {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const icon = document.createElement("i");
  const titleSpan = document.createElement("span");
  const deadline = document.createElement("span");
  const deleteBtn = document.createElement("button");

  const id = `task-${todo.getTitle()}`;

  icon.classList.add("fa-regular", "fa-circle");

  label.htmlFor = id;
  label.classList.add("list-label");

  input.id = id;
  input.type = "checkbox";
  input.style.position = "absolute";
  input.style.opacity = 0;

  titleSpan.textContent = todo.getTitle();

  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.classList.add = "delete-btn";

  renderDueDate(todo, deadline);

  label.append(icon, titleSpan, input, deadline);

  return { label, icon, input, deadline, deleteBtn };
};

const renderTodoStatus = (label, icon, status) => {
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

const renderDueDate = (todo, container) => {
  const daysRemaining = differenceInCalendarDays(todo.getDueDate(), new Date());

  if (daysRemaining == 0) {
    container.textContent = "This task is due today!";
  } else if (daysRemaining == -1) {
    container.textContent = "This task is due tomorrow!";
  } else {
    container.textContent = `This task is due in: ${daysRemaining + 1} days`;
  }

  container.classList.add("deadline-span");
};

export default {
  renderDiv,
  renderTodoStatus,
  renderDueDate,
  renderForm,
  renderTodo,
};
