import todoController from "../controllers/todoController.js";

const init = (container) => {
  const inbox = container.querySelector(".inbox");
  const div = container.querySelector(".div");
  const addBtn = container.querySelector(".addTodo");

  displayFolder(inbox);

  addBtn.addEventListener("click", () => {
    showForm(div, inbox, addBtn);
  });
};

const displayFolder = (folder) => {
  const archive = todoController.fetchArchive();
  folder.textContent = "";

  archive.inbox.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.getTitle();
    folder.appendChild(li);
  });
};

const showForm = (container, folder, btn) => {
  btn.style.display = "none";

  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");

  input.type = "text";
  button.type = "submit";
  button.textContent = "Enter";

  form.append(input, button);
  container.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    if (!task.trim()) return;

    todoController.addTodo(task);
    displayFolder(folder);

    form.remove();
    btn.style.display = "";
  });
};

export default { init };
