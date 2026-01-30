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
    this.projectTodos = [];
  }

  getName() {
    return this.name;
  }

  setProjectName(newProjectName) {
    this.name = newProjectName;
  }

  getProjectTodos() {
    return this.todos;
  }

  addNewTodo(todo) {
    this.projectTodos.push(todo);
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

  function createProject(projectName) {
    return new Project(projectName);
  }

  const hasProject = (projectName) => {
    return allTodos.find((project) => (project.name = projectName));
  };

  const addProject = (projectName) => {
    if (!hasProject(projectName)) {
      const newProject = createProject(projectName);
      allTodos.push(newProject);
    }
  };

  const addProjectTodo = (todo, projectName) => {
    const project = hasProject(projectName);
    if (project) {
      project.addNewTodo(todo);
    } else {
      addTodo(todo);
    }
  };

  const addTodo = (todo) => {
    allTodos[0].todos.push(todo);
  };

  const deleteTodo = (todo) => {};

  const printTodos = () => {
    console.table(allTodos);
  };

  return {
    addProject,
    addTodo,
    addProjectTodo,
    createTodo,
    createProject,
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
