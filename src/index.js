import "./styles.css";
class Todo {
  constructor(title, description, dueDate, priority, checklist) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(newPriority) {
    this.priority = newPriority;
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
  const deleteTodo = () => {};

  const printTodos = () => {
    console.log(todos);
  };

  return {
    createTodo,
    addTodo,
    deleteTodo,
    toggleTodo,
    printTodos,
  };
})();

const newTodo = todoController.createTodo(
  "Surfar",
  "In Sombrio",
  "Today",
  "High",
);

todoController.addTodo(newTodo);
todoController.printTodos();
