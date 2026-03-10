import todoController from "../controllers/todoController.js";
import eventController from "../controllers/eventController.js";
import todoView from "../views/todoView.js";
import { format } from "date-fns";

const init = () => {
  const dialog = document.querySelector("dialog");
  const addTodo = document.querySelector(".custom-btn.add-todo");

  eventController.bindAddTodoButton(addTodo, () => {
    displayForm(dialog);
    dialog.showModal();
  });

  renderTodoList("default");
};

const displayForm = (dialog) => {
  createForm(dialog);

  eventController.bindCancelButton(cancelBtn, function () {
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

    todoController.addTodo(task.trim(), dueDate);
    renderTodoList("default");
    form.remove();
    dialog.close();
  });
};

export default { init };
