export default class Project {
  #id;
  #projectName;
  #todos;

  constructor(projectName) {
    this.#id = Math.floor(Math.random() * 1_000_000);
    this.#projectName = projectName;
    this.#todos = [];
  }

  getId() {
    return this.#id;
  }

  getProjectName() {
    return this.#projectName;
  }

  getTodos() {
    return [...this.#todos];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  setTodos(newTodos) {
    this.#todos = [...newTodos];
  }

  toJSON() {
    return {
      id: this.#id,
      projectName: this.#projectName,
      todos: [...this.#todos],
    };
  }

  static fromJSON(data) {
    const project = new Project(data.projectName, data.todos);
    project.#id = data.id;
    return project;
  }
}
