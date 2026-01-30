import "./styles.css";
class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #checklist;

  constructor(title, description, dueDate, priority, checklist) {
    this.id = Math.floor(Math.random() * 1_000_000);
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

  function createProject(name) {
    return new Project(name);
  }

  const addTodo = (todo, projectName) => {
    const project = allTodos.find((proj) => proj.name == projectName);
    if (!project) {
      const newProject = createProject(projectName);
      newProject.todos.push(todo);
      allTodos.push(newProject);
    } else {
      allTodos[0].todos.push(todo);
    }
  };

  const deleteTodo = (todo, projectName) => {
    const project = allTodos.find((proj) => proj.name == projectName);
    if (!project) {
      allTodos[0].todos = allTodos[0].todos.filter((t) => t.id != todo.id);
    }
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

const firstTodo = todoController.createTodo(
  "Surfar",
  "In Sombrio",
  "Today",
  "High",
);

const secondTodo = todoController.createTodo(
  "Jogar Futebol",
  "In JR",
  "Tomorrow",
  "Low",
);

const screenController = (function () {})();

debugger;
todoController.addTodo(firstTodo, "BCIT");
todoController.addTodo(secondTodo);
todoController.deleteTodo(secondTodo);
todoController.printTodos();
