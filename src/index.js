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

  setTitle(newTitle) {
    this.#title = newTitle;
  }

  setDescription(newDescription) {
    this.#description = newDescription;
  }

  setDueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }

  setChecklist(newChecklist) {
    this.#checklist = newChecklist;
  }

  toggleChecklist() {
    this.checklist = !this.checklist;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const todoController = (function () {
  const allTodos = [
    {
      name: "Default",
      todos: [],
    },
  ];

  function createTodo(title, description, dueDate, priority) {
    return new Todo(title, description, dueDate, priority, false);
  }

  function createProject(name, todo) {
    return new Project(name, todo);
  }

  const addTodo = (todo, projectName) => {
    const res = allTodos.find((project) => project.name == projectName);
    if (!res.name) {
      allTodos[0].todos.push(todo);
    } else {
      const newProject = createProject(projectName);
      newProject.todos.push(todo);
    }
  };
  const deleteTodo = (id, projectName) => {
    allTodos.splice(id, 1);
  };

  const printTodos = () => {
    console.table(allTodos);
  };

  return {
    createTodo,
    createProject,
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

const screenController = (function () {})();

debugger;
todoController.addTodo(newTodo);
todoController.printTodos();
