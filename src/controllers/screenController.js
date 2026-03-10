import todoController from "../controllers/todoController.js";
import eventController from "../controllers/eventController.js";
import renderController from "../controllers/renderController.js";
import { format } from "date-fns";

const init = () => {
  const dialog = document.querySelector("dialog");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  displayTodoList("default");

  eventController.bindAddTodoButton(addTodo, () => {
    displayForm(dialog);
    dialog.showModal();
  });
};

const displayTodoList = (folder) => {
  const archive = todoController.loadStorage();
  const inboxDiv = document.querySelector(".inbox-div");
  const completedDiv = document.querySelector(".completed-div");

  if (!folder || folder.trim() === "") return;

  inboxDiv.textContent = "";
  completedDiv.textContent = "";

  archive[folder].forEach((todo) => {
    const innerDiv = renderController.renderDiv("div", "inner-div");
    const { label, icon, input, deadline, deleteBtn } =
      renderController.renderTodo(todo);
    const status = todo.getChecklist();

    innerDiv.append(label, deleteBtn);

    if (status) {
      completedDiv.appendChild(innerDiv);
      deadline.textContent = "Done!";
    } else {
      inboxDiv.appendChild(innerDiv);
    }

    renderController.renderTodoStatus(label, icon, status);

    eventController.bindTodoToggle(input, () => {
      const currentStatus = input.checked;

      if (currentStatus) {
        todo.setChecklist(!status);
      }

      todoController.updateStorage(todo);
      displayTodoList("default");
    });
  });
};

const displayForm = (dialog) => {
  const { form, taskInput, dueDateInput, cancelBtn } =
    renderController.renderForm(dialog);

  eventController.bindCancelButton(cancelBtn, () => {
    form.remove();
    dialog.close();
  });

  eventController.bindFormSubmit(form, (e) => {
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

    todoController.addTodo(task, dueDate);
    displayTodoList("default");
    form.remove();
    dialog.close();
  });
};

export default { init };
