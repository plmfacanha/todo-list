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
    const project = new Project(data.projectName);
    project.#id = data.id;
    project.#todos = (data.todos || []).map((todo) => Todo.fromJSON(todo));
    return project;
  }
}
