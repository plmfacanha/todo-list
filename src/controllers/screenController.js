import todoController from "../controllers/todoController.js";
import eventController from "../controllers/eventController.js";
import renderController from "../controllers/renderController.js";
import { format } from "date-fns";

const init = () => {
  const dialog = document.querySelector("dialog");
  const addTodo = document.querySelector(".custom-btn.add-todo");
  const addProject = document.querySelector(".custom-btn.add-project");

  displayTodos();
  displayProjects();

  eventController.bindAddTodoButton(addTodo, () => {
    displayForm(dialog);
    dialog.showModal();
  });

  eventController.bindAddProjectButton(addProject, () => {
    displayProjectForm(dialog);
    dialog.showModal();
  });
};

const displayTodos = (project) => {
  const archive = todoController.loadStorage();
  const inboxDiv = document.querySelector(".inbox-div");
  const completedDiv = document.querySelector(".completed-div");

  inboxDiv.textContent = "";
  completedDiv.textContent = "";

  if (!project) {
    archive.inbox.forEach((todo) => {
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

        displayTodos();
      });

      eventController.bindDeleteButton(deleteBtn, (e) => {
        todoController.deleteTodo(todo);
        displayTodos();
      });
    });
  } else {
    archive.projects[project].todos.forEach((todo) => {
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

        displayTodos(project);
      });

      eventController.bindDeleteButton(deleteBtn, (e) => {
        todoController.deleteTodo(todo);
        displayTodos(project);
      });
    });
  }
};

const displayForm = (dialog) => {
  const { form, taskInput, dueDateInput, cancelBtn } =
    renderController.renderForm(dialog);

  eventController.bindCancelButton(cancelBtn, () => {
    form.remove();
    dialog.close();
  });

  eventController.bindFormSubmit(form, (e) => {
    const h2 = document.querySelector(".inbox-header");
    const projectName = h2.textContent;
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

    if (projectName === "Inbox") {
      todoController.addTodo(task, dueDate);
      // displayTodos()
    } else {
      todoController.addTodo(task, projectName, dueDate);
      // displayTodos(projectName);
    }

    form.remove();
    dialog.close();
    displayTodos();
  });
};

const displayProjectForm = (dialog) => {
  const { form, cancelBtn } = renderController.renderForm(dialog);

  renderController.updateForm(form);

  eventController.bindCancelButton(cancelBtn, () => {
    form.remove();
    dialog.close();
  });

  eventController.bindFormSubmit(form, (e) => {
    e.preventDefault();
    const projectName = document.getElementById("task").value;

    const message = todoController.addProject(projectName);

    if (message?.error) {
      alert(message.error);
      return;
    }

    if (message?.ok) {
      alert(message.ok);
      displayProjects();
      form.remove();
      dialog.close();
    }
  });
};

const displayProjects = () => {
  const archive = todoController.loadStorage();
  const projects = document.querySelector(".projects");

  projects.textContent = "";

  archive.projects.forEach((project) => {
    const { div, li, icon } = renderController.renderProjectDiv();
    li.textContent = project.getProjectName();
    div.dataset.name = li.textContent;
    div.dataset.open = "false";
    projects.appendChild(div);

    eventController.bindProjectToggle(div, () => {
      toggleProjectFolder(div, icon);
      return;
    });
  });
};

const toggleProjectFolder = (div, icon) => {
  const isOpen = div.dataset.open === "true";
  if (isOpen) {
    icon.classList.add("fa-folder");
    icon.classList.remove("fa-folder-open");
    renderController.updateInbox();
    div.dataset.open = "false";
    return;
  }

  icon.classList.remove("fa-folder");
  icon.classList.add("fa-folder-open");
  renderController.updateInbox(div);
  div.dataset.open = "true";
};

export default { init };
