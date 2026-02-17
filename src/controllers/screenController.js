import todoController from "../controllers/todoController.js";

const init = (container) => {
  const btn = container.querySelector(".addBtn");
  const inbox = container.querySelector(".inbox");
  const div = container.querySelector(".div");

  displayInbox(inbox);

  btn.addEventListener("click", () => {
    showForm(div, inbox, btn);
  });
};

const displayInbox = (inbox) => {
  const archive = todoController.fetchArchive();
  inbox.textContent = "";

  archive.inbox.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.getTitle();
    inbox.appendChild(li);
  });
};

const showForm = (container, inbox, btn) => {
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
    displayInbox(inbox);

    form.remove();
    btn.style.display = "";
  });
};

export default { init };
