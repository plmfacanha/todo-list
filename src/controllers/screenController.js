import todoController from "../controllers/todoController.js";

const init = (container) => {
  const customDiv = container.querySelector(".custom-div");
  const addTodo = container.querySelector(".custom-btn.add-todo");

  displayFolders();

  addTodo.addEventListener("click", () => {
    showForm(customDiv, addTodo);
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
};

export default { init };
