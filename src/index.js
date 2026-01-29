import "./styles.css";
class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #checklist;

  constructor(title, description, dueDate, priority, checklist) {
    this.id = crypto.randomUUID();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#checklist = checklist;
  }

  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }
  getDueDate() {
    return this.#dueDate;
  }
  getPriority() {
    return this.#priority;
  }
  getChecklist() {
    return this.#checklist;
  }

  setPriority(newPriority) {
    this.#priority = newPriority;
  }

  toggleChecklist() {
    this.checklist = !this.checklist;
  }
}

const todoController = (function () {
  const todos = [];

  function createTodo(title, description, dueDate, priority) {
    return new Todo(title, description, dueDate, priority, false);
  }
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const deleteTodo = (id) => {
    todos.splice(id, 1);
  };

  const printTodos = () => {
    console.table(todos);
  };

  return {
    createTodo,
    addTodo,
    deleteTodo,
    printTodos,
  };
})();

const newTodo = todoController.createTodo(
  "Surfar",
  "In Sombrio",
  "Today",
  "High",
);

debugger;
todoController.addTodo(newTodo);
todoController.printTodos();
