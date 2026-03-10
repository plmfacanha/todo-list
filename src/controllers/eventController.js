const bindAddTodoButton = (button, callback) => {
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

export default {
  bindAddTodoButton,
  bindTodoToggle,
  bindCancelButton,
  bindFormSubmit,
};
