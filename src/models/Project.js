export default class Project {
  #name;
  #todos;
  constructor(name) {
    this.#name = name;
    this.#todos = [];
  }

  getName() {
    return this.#name;
  }

  getTodos() {
    return [...this.#todos];
  }

  setTodos(todo) {
    this.#todos.push(todo);
  }
}
