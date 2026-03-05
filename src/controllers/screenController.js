import todoController from "../controllers/todoController.js";
import { differenceInCalendarDays } from "date-fns";

const renderTaskList = (folder) => {
  const archive = todoController.fetchArchive();
  const inboxDiv = document.querySelector(".inbox-div");
  const completedDiv = document.querySelector(".completed-div");

  if (!folder || folder.trim() === "") return;

  inboxDiv.textContent = "";

  archive[folder].forEach((todo) => {
    const { label, icon, input, deadline } = renderTodo(inboxDiv, todo);

    input.addEventListener("change", () => {
      const isCompleted = input.checked;

      todo.setChecklist(isCompleted);
      toggleTodo(label, icon, isCompleted);

      if (isCompleted) {
        completedDiv.appendChild(label);
        deadline.textContent = "DONE!";
        return;
      }

      inboxDiv.appendChild(label);
    });
  });
};

const toggleTodo = (label, icon, isCompleted) => {
  if (isCompleted) {
    label.classList.add("completed-task");
    icon.classList.add("fa-solid", "fa-circle-check", "completed-icon");
    icon.classList.remove("fa-regular", "fa-circle");
    return;
  }

  label.classList.remove("completed-task");
  icon.classList.remove("fa-solid", "fa-circle-check", "completed-icon");
  icon.classList.add("fa-regular", "fa-circle");
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

const showForm = (container, btn) => {
  btn.style.display = "none";

  const form = document.createElement("form");
  const taskLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const taskInput = document.createElement("input");
  const dueDateInput = document.createElement("input");

  const inputDiv = document.createElement("div");

  const confirmBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

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

  form.append(inputDiv, confirmBtn, cancelBtn);
  container.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = taskInput.value;
    const newDueDate = todoController.convertDateFormat(dueDateInput.value);

    const todo = todoController.addTodo(task);
    todo.setDueDate(newDueDate);

    form.remove();
    renderTaskList("default");
    btn.style.display = "";
  });
};

export default { showForm };
