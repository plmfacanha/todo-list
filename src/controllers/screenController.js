import todoController from "../controllers/todoController.js";

const init = (container) => {
  const form = container.querySelector(".div");
  const btn = container.querySelector(".addTodo");

  displayFolder("inbox");

  btn.addEventListener("click", () => {
    showForm(form, "inbox", btn);
  });
};

const displayFolder = (folderName) => {
  const archive = todoController.fetchArchive();
  const folder = document.querySelector(`.${folderName}`);
  folder.textContent = "";

  archive[folderName].forEach((todo) => {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");

    li.textContent = todo.getTitle();
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    div.append(li, deleteBtn);

    folder.appendChild(div);
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
