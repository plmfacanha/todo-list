import todoController from "../controllers/todoController.js";

const init = (container) => {
  const addDiv = container.querySelector(".add-div");
  const addBtn = container.querySelector(".custom-btn.add-todo");

  displayFolders();

  addBtn.addEventListener("click", () => {
    showForm(addDiv, addBtn);
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
    const nameLine = document.createElement("div");
    const todosDiv = document.createElement("div");
    const projectName = project.getName();
    const projectTodos = project.getTodos();

    nameLine.textContent = `Name: ${projectName}`;
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

const showForm = (container, btn) => {};

export default { init };
