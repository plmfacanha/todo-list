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

    todoController.addTodo(task);
    displayFolder(folder);

    form.remove();
    btn.style.display = "";
  });
};

export default { init };
