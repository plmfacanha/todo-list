const bindAddTodoButton = (button, callback) => {
  button.addEventListener("click", callback);
};

const bindAddProjectButton = (button, callback) => {
  button.addEventListener("click", callback);
};

const bindTodoToggle = (input, callback) => {
  input.addEventListener("change", callback);
};

const bindCancelButton = (button, callback) => {
  button.addEventListener("click", callback);
};

const bindFormSubmit = (form, callback) => {
  form.addEventListener("submit", callback);
};

const bindDeleteButton = (button, callback) => {
  button.addEventListener("click", callback);
};

export default {
  bindAddTodoButton,
  bindAddProjectButton,
  bindTodoToggle,
  bindCancelButton,
  bindFormSubmit,
  bindDeleteButton,
};
