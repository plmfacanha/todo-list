import todoController from "../controllers/todoController.js";

const init = (container) => {
  const form = container.querySelector(".form");
  const addBtn = container.querySelector(".addBtn");

  displayFolders();

  addBtn.addEventListener("click", () => {
    showForm(form, addBtn);
  });
};

const displayFolders = () => {
  const archive = todoController.fetchArchive();
  const inbox = document.querySelector(".inbox");
  const projects = document.querySelector(".projects");
  inbox.textContent = "";
  projects.textContent = "";

  archive["inbox"].forEach((todo) => {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");

    li.textContent = todo.getTitle();
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    div.append(li, deleteBtn);

    inbox.appendChild(div);
  });

  archive["projects"].forEach((project) => {
    const headingDiv = document.createElement("div");
    const projectName = project.getName();
    const projectTodos = project.getTodos();

    const nameLine = document.createElement("div");
    nameLine.textContent = `Name: ${projectName}`;
    const todosDiv = document.createElement("div");
    todosDiv.textContent = "Tasks:";

    headingDiv.append(nameLine, todosDiv);

    projectTodos.forEach((todo) => {
      const todoList = document.createElement("div");
      const li = document.createElement("li");
      const deleteBtn = document.createElement("button");

      li.textContent = todo.getTitle();
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");

      todoList.classList.add("custom-div");
      todoList.append(li, deleteBtn);

      todosDiv.appendChild(todoList);

      headingDiv.appendChild(todosDiv);
    });
    projects.append(headingDiv);
  });
};

const showForm = (container, btn) => {
  btn.style.display = "none";

  const form = document.createElement("form");
  const taskLabel = document.createElement("label");
  const taskInput = document.createElement("input");
  const addBtn = document.createElement("button");

  taskLabel.textContent = "Task:";
  taskInput.type = "text";
  addBtn.type = "submit";
  addBtn.textContent = "Enter";
  addBtn.classList.add("add-btn");

  const projectLabel = document.createElement("label");
  const projectInput = document.createElement("input");

  projectLabel.textContent = "Project:";
  projectInput.type = "text";

  const taskDiv = document.createElement("div");
  const projectDiv = document.createElement("div");

  taskDiv.append(taskLabel, taskInput);
  projectDiv.append(projectLabel, projectInput);

  form.append(taskDiv, projectDiv, addBtn);
  container.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = taskInput.value;
    const project = projectInput.value;
    if (!task.trim()) return;

    todoController.addTodo(task, project);
    displayFolders();

    form.remove();
    btn.style.display = "";
  });
};

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

export default { init };
