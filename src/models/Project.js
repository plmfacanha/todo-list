export default class Project {
  #id;
  #name;
  #todos;

  constructor(name) {
    this.#id = Math.floor(Math.random() * 1_000_000);
    this.#name = name;
    this.#todos = [];
  }

  getName() {
    return this.#name;
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
}
